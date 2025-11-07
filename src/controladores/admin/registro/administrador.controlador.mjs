import { sequelize } from "../../../config/database.config.mjs";
import { Administrador, Usuario } from "../../../modelos/index.modelo.mjs";
import { generarContrasena, hashearContrasena } from "../../../utils/password.util.mjs";

export const registrarAdministrador = async (request, response) => {
  const transaccion = await sequelize.transaction();

  try {
    const { correo, nombre, apellido } = request.body;

    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return response.status(400).send({ error: "El correo ya está registrado" });
    }

    const contrasena = generarContrasena();

    const usuario = await Usuario.create(
      {
        correo: correo,
        contrasena: await hashearContrasena(contrasena),
        rol: "administrador",
        verificado: true,
      },
      { transaction: transaccion },
    );

    await Administrador.create(
      { usuario_id: usuario.id, nombre: nombre, apellido: apellido },
      { transaction: transaccion },
    );

    await transaccion.commit();

    console.log("Usuario registrado:", correo, contrasena);
    return response.status(201).send({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    await transaccion.rollback();
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
