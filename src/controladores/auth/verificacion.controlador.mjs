import { Token } from "../../modelos/index.modelo.mjs";
import { correoVerificacion } from "../../servicios/correo/correo.servicio.mjs";
import { generarCodigo } from "../../utils/password.util.mjs";

export const verificar = async (request, response) => {
  try {
    const { codigo } = request.body;
    const usuario = request.usuario;

    if (!usuario) {
      return response.status(400).send({ error: "Usuario no encontrado" });
    }

    if (usuario.verificado) {
      return response.status(400).send({ error: "El correo ya está verificado" });
    }

    const token = await Token.findOne({ where: { usuario_id: usuario.id, tipo: "verificacion", codigo: codigo } });

    if (!token) {
      return response.status(400).send({ error: "Código de verificación inválido" });
    }

    if (token.expira < new Date()) {
      return response.status(400).send({ error: "El código de verificación ha expirado" });
    }

    await usuario.update({ verificado: true });
    await token.destroy();

    return response.status(201).send({ mensaje: "Correo verificado correctamente" });
  } catch (error) {
    console.error("Error al verificar correo:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};

export const reenviar = async (request, response) => {
  try {
    const usuario = request.usuario;

    if (!usuario) {
      return response.status(400).send({ error: "Usuario no encontrado" });
    }

    if (usuario.verificado) {
      return response.status(400).send({ error: "El correo ya está verificado" });
    }

    await Token.destroy({ where: { usuario_id: usuario.id, tipo: "verificacion" } });

    const codigo = generarCodigo();
    const expira = new Date();
    expira.setHours(expira.getHours() + 12);

    await Token.create({ usuario_id: usuario.id, tipo: "verificacion", codigo: codigo, expira: expira });
    await correoVerificacion(usuario.correo, usuario.nombre, codigo);
    return response.status(201).send({ mensaje: "Código de verificación enviado", token: codigo });
  } catch (error) {
    console.error("Error al verificar correo:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
