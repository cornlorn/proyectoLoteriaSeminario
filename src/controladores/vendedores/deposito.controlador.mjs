import { sequelize } from "../../config/database.config.mjs";
import { Billetera, Cliente, Transaccion, Usuario } from "../../modelos/index.modelo.mjs";

export const depositar = async (request, response) => {
  const transaccion = await sequelize.transaction();

  try {
    const { id, monto } = request.body;

    const billetera = await Billetera.findByPk(id, {
      include: { model: Cliente, as: "cliente" },
      transaction: transaccion,
    });

    if (!billetera) {
      return response.status(404).send({ error: "Billetera no encontrada" });
    }

    if (billetera.cliente.verificado === false) {
      return response.status(403).send({ error: "El cliente no está verificado" });
    }

    const saldo = Number(billetera.saldo) + Number(monto);
    await billetera.update({ saldo: saldo }, { transaction: transaccion });

    await Transaccion.create(
      { billetera_id: billetera.id, tipo: "deposito", monto: monto },
      { transaction: transaccion },
    );

    await transaccion.commit();
    return response.status(200).send({ mensaje: "Depósito realizado correctamente", saldo: saldo });
  } catch (error) {
    await transaccion.rollback();
    console.error("Error al procesar el depósito:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
