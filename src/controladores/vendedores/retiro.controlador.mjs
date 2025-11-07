import { sequelize } from "../../config/database.config.mjs";
import { Billetera, Cliente, Transaccion, Usuario } from "../../modelos/index.modelo.mjs";
import { correoNotificacionRetiro } from "../../servicios/correo/correo.servicio.mjs";

export const retirar = async (request, response) => {
  const transaccion = await sequelize.transaction();

  try {
    const { id, monto } = request.body;

    const billetera = await Billetera.findByPk(id, { include: { model: Cliente, as: "cliente" } });

    if (!billetera) {
      return response.status(404).send({ error: "Billetera no encontrada" });
    }

    if (billetera.cliente.verificado === false) {
      return response.status(403).send({ error: "El cliente no está verificado" });
    }

    if (monto > billetera.saldo) {
      return response.status(400).send({ error: "Fondos insuficientes en la billetera" });
    }

    const saldo = Number(billetera.saldo) - Number(monto);
    await billetera.update({ saldo: saldo }, { transaction: transaccion });

    await Transaccion.create(
      { billetera_id: billetera.id, tipo: "retiro", monto: monto },
      { transaction: transaccion },
    );

    await transaccion.commit();

    const usuario = await Usuario.findByPk(billetera.cliente.usuario_id, { attributes: ["correo"] });

    if (usuario) {
      await correoNotificacionRetiro(usuario.correo, billetera.cliente.nombre, monto, saldo);
    }

    return response.status(200).send({ mensaje: "Retiro realizado correctamente", saldo: saldo });
  } catch (error) {
    await transaccion.rollback();
    console.error("Error al procesar el retiro:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
