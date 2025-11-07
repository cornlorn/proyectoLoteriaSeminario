import { sequelize } from "../../../config/database.config.mjs";
import { Billetera, Cliente, Token, Usuario } from "../../../modelos/index.modelo.mjs";
import { correoEnvioCredenciales } from "../../../servicios/correo/correo.servicio.mjs";
import {
  generarCodigo,
  generarContrasena,
  hashearContrasena,
} from "../../../utils/password.util.mjs";

export const registrarCliente = async (request, response) => {
  const transaccion = await sequelize.transaction();

  try {
    const { correo, nombre, apellido, sexo, nacimiento, telefono } = request.body;

    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return response.status(400).send({ error: "El correo ya está registrado" });
    }

    const contrasena = generarContrasena();

    const usuario = await Usuario.create(
      { correo: correo, contrasena: await hashearContrasena(contrasena) },
      { transaction: transaccion },
    );

    const cliente = await Cliente.create(
      {
        usuario_id: usuario.id,
        nombre: nombre,
        apellido: apellido,
        sexo: sexo,
        nacimiento: nacimiento,
        telefono: telefono,
      },
      { transaction: transaccion },
    );

    await Billetera.create({ cliente_id: cliente.id }, { transaction: transaccion });

    const codigo = generarCodigo();
    const expira = new Date();
    expira.setHours(expira.getHours() + 12);

    await Token.create(
      { usuario_id: usuario.id, tipo: "verificacion", codigo: codigo, expira: expira },
      { transaction: transaccion },
    );

    await transaccion.commit();

  await correoEnvioCredenciales(correo, nombre, contrasena);
  return response.status(201).send({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    await transaccion.rollback();
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
