import { Token, Usuario } from "../../modelos/index.modelo.mjs";
import { correoRecuperacionContrasena } from "../../servicios/correo/correo.servicio.mjs";
import { generarCodigo, hashearContrasena } from "../../utils/password.util.mjs";

export const solicitar = async (request, response) => {
  try {
    const { correo } = request.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return response.status(404).send({ error: "Usuario no encontrado" });
    }

    const codigo = generarCodigo();
    const expira = new Date();
    expira.setHours(expira.getHours() + 1);

    await Token.destroy({ where: { usuario_id: usuario.id, tipo: "recuperacion" } });

    await Token.create({ usuario_id: usuario.id, tipo: "recuperacion", codigo: codigo, expira: expira });

    await correoRecuperacionContrasena(correo, codigo);
    return response.status(200).send({ mensaje: "Se ha enviado un código de recuperación a tu correo" });
  } catch (error) {
    console.error("Error al solicitar recuperación:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};

export const restablecer = async (request, response) => {
  try {
    const { correo, codigo, contrasena } = request.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return response.status(404).send({ error: "Usuario no encontrado" });
    }

    const token = await Token.findOne({ where: { usuario_id: usuario.id, tipo: "recuperacion", codigo: codigo } });

    if (!token) {
      return response.status(400).send({ error: "Código de recuperación inválido" });
    }

    if (token.expira < new Date()) {
      await token.destroy();
      return response.status(400).send({ error: "El código de recuperación ha expirado" });
    }

    await usuario.update({ contrasena: await hashearContrasena(contrasena) });

    await token.destroy();

    return response.status(200).send({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
