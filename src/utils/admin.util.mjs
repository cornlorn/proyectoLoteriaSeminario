import { Usuario, Administrador } from "../modelos/index.modelo.mjs";
import { hashearContrasena } from "./password.util.mjs";
import { sequelize } from "../config/database.config.mjs";

const { ADMIN_USER, ADMIN_PASS, ADMIN_NAME, ADMIN_SURNAME } = process.env;

export const inicializarAdministrador = async () => {
  const transaccion = await sequelize.transaction();

  try {
    const administradorExistente = await Usuario.findOne({
      where: { rol: "administrador" },
      transaction: transaccion,
    });

    if (administradorExistente) {
      console.log("Ya existe un usuario con rol de administrador");
      await transaccion.rollback();
      return;
    }

    const correoRegistrado = await Usuario.findOne({
      where: { correo: ADMIN_USER },
      transaction: transaccion,
    });

    if (correoRegistrado) {
      console.log("El correo ya está en uso por otro usuario");
      await transaccion.rollback();
      return;
    }

    const contrasena = await hashearContrasena(ADMIN_PASS);

    const nuevoUsuario = await Usuario.create(
      { correo: ADMIN_USER, contrasena: contrasena, rol: "administrador", verificado: true },
      { transaction: transaccion },
    );

    await Administrador.create(
      { usuario_id: nuevoUsuario.id, nombre: ADMIN_NAME, apellido: ADMIN_SURNAME },
      { transaction: transaccion },
    );

    await transaccion.commit();
    console.log("Usuario administrador creado automáticamente");
  } catch (error) {
    await transaccion.rollback();
    console.error("Error creando administrador automáticamente:", error);
  }
};
