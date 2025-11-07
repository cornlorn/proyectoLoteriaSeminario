import { sequelize } from "../../config/database.config.mjs";
import { Usuario, Cliente, Administrador, Billetera } from "../../modelos/index.modelo.mjs";
import { hashearContrasena } from "../../utils/password.util.mjs";
import { correoClienteRegistro } from "../../servicios/correo/cliente-registro.servicio.mjs";

export const registrarUsuario = async (request, response) => {
  const transaccion = await sequelize.transaction();

  try {
    const { correo, contrasena, rol, nombre, apellido, sexo, nacimiento, telefono } = request.body;

    if (request.usuario.rol !== "administrador") {
      return response.status(403).send({ error: "Acceso denegado" });
    }

    if (!["cliente", "administrador"].includes(rol)) {
      return response.status(400).send({ error: "Rol no válido. Solo cliente o administrador." });
    }

    const existente = await Usuario.findOne({ where: { correo } });
    if (existente) {
      return response.status(400).send({ error: "El correo ya está registrado." });
    }

    const usuario = await Usuario.create(
      {
        correo: correo,
        contrasena: await hashearContrasena(contrasena),
        rol: rol,
        verificado: rol === "administrador",
      },
      { transaction: transaccion },
    );

    if (rol === "cliente") {
      const cliente = await Cliente.create(
        { usuario_id: usuario.id, nombre, apellido, sexo, nacimiento, telefono },
        { transaction: transaccion },
      );

      await Billetera.create({ cliente_id: cliente.id }, { transaction: transaccion });
    } else if (rol === "administrador") {
      await Administrador.create(
        { usuario_id: usuario.id, nombre, apellido },
        { transaction: transaccion },
      );
    }

    await transaccion.commit();

    return response.status(201).send({ mensaje: `${rol} creado correctamente.` });
  } catch (error) {
    console.error("Error al crear usuario por admin:", error);
    await transaccion.rollback();
    return response.status(500).send({ error: "Error interno del servidor." });
  }
};
