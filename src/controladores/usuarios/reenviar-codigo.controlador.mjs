import { Token, Usuario } from "../../modelos/index.modelo.mjs";

export const reenviarToken = async (request, response) => {
  try {
    const { correo } = request.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return response.status(400).send({ error: "Usuario no encontrado" });
    }

    if (usuario.verificado) {
      return response.status(400).send({ error: "El correo ya está verificado" });
    }

    await Token.destroy({ where: { usuario_id: usuario.id, tipo: "verificacion" } });

    const valor = Math.floor(100000 + Math.random() * 900000).toString();
    const expira = new Date();
    expira.setHours(expira.getHours() + 12);

    await Token.create({
      usuario_id: usuario.id,
      tipo: "verificacion",
      valor: valor,
      expira: expira,
    });

    return response.status(201).send({ mensaje: "Código de verificación enviado", token: valor });
  } catch (error) {
    console.error("Error al verificar correo:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
