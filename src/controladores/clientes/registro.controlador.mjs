import { sequelize } from "../../config/database.config.mjs";
import { Billetera, Cliente, Usuario } from "../../modelos/index.modelo.mjs";

export const registrar = async (request, response) => {
  const transaccion = await sequelize.transaction();

  try {
    const { correo, contrasena, nombre, apellido, telefono } = request.body;

    const usuario = await Usuario.create(
      { correo: correo, contrasena: contrasena },
      { transaction: transaccion },
    );

    const cliente = await Cliente.create(
      { usuario_id: usuario.id, nombre: nombre, apellido: apellido, telefono: telefono },
      { transaction: transaccion },
    );

    const billetera = await Billetera.create(
      { cliente_id: cliente.id },
      { transaction: transaccion },
    );

    await transaccion.commit();

    return response.status(201).send({ mensaje: "Cliente registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    await transaccion.rollback();
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
