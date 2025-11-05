import { Token, Usuario } from "../../modelos/index.modelo.mjs";

export const verificarCorreo = async (request, response) => {
  try {
    const { correo, codigo } = request.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return response.status(400).send({ error: "Usuario no encontrado" });
    }

    if (usuario.verificado) {
      return response.status(400).send({ error: "El correo ya está verificado" });
    }

    const token = await Token.findOne({
      where: { usuario_id: usuario.id, tipo: "verificacion", valor: codigo },
    });

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
