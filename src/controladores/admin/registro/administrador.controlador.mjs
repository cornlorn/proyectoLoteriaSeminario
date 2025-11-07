import { sequelize } from "../../../config/database.config.mjs";
import { Cliente, Token, Usuario } from "../../../modelos/index.modelo.mjs";
import { correoClienteRegistro } from "../../../servicios/correo/cliente-registro.servicio.mjs";
import { generarContrasena, hashearContrasena } from "../../../utils/password.util.mjs";

export const registrar = async (request, response) => {
  const transaccion = await sequelize.transaction();

  try {
    const { correo, nombre, apellido } = request.body;

    const usuarioExistente = await Usuario.findOne({ where: { correo } });

    if (usuarioExistente) {
      return response.status(400).send({ error: "El correo ya está registrado" });
    }

    const contrasena = generarContrasena();

    const usuario = await Usuario.create(
      { correo: correo, contrasena: await hashearContrasena(contrasena), rol: "administrador" },
      { transaction: transaccion },
    );

    const cliente = await Cliente.create(
      { usuario_id: usuario.id, nombre: nombre, apellido: apellido },
      { transaction: transaccion },
    );

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expira = new Date();
    expira.setHours(expira.getHours() + 12);

    await Token.create(
      { usuario_id: usuario.id, tipo: "verificacion", valor: token, expira: expira },
      { transaction: transaccion },
    );

    await transaccion.commit();

    await correoClienteRegistro(correo, nombre, 'N/A', token, contrasena);

    return response.status(201).send({ mensaje: "Administrador registrado correctamente", token: token });
  } catch (error) {
    console.error("Error al registrar cliente:", error);
    await transaccion.rollback();
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
