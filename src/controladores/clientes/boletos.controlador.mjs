import { sequelize } from "../../config/database.config.mjs";
import { Billetera, Boleto, Cliente, Juego, Jugada, Sorteo, Transaccion } from "../../modelos/index.modelo.mjs";
import { crearCartonBingoAutomatico } from "../../utils/bingo.util.mjs";
import { validarBoleto, validarJugada, validarNumeroJuego } from "../../utils/juego.util.mjs";

const obtenerSorteoPendiente = async (id) => {
  return await Sorteo.findOne({ where: { juego_id: id, estado: "pendiente" }, order: [["fechaHora", "ASC"]] });
};

export const comprarBoletoNumerico = async (request, response) => {
  const { id, jugadas } = request.body;

  if (!id || !Array.isArray(jugadas) || jugadas.length === 0) {
    return response.status(400).send({ mensaje: "Datos incompletos" });
  }

  const transaction = await sequelize.transaction();
  try {
    const cliente = await Cliente.findOne({
      where: { usuario_id: request.usuario.id },
      include: [{ model: Billetera, as: "billetera" }],
    });
    if (!cliente) throw new Error("Cliente no encontrado");

    const juego = await Juego.findByPk(id);
    if (!juego) throw new Error("Juego no encontrado");
    if (juego.estado !== "activo") throw new Error("Juego inactivo");

    const sorteo = await obtenerSorteoPendiente(juego.id);
    if (!sorteo) throw new Error("No hay sorteo pendiente disponible");

    const validacionBoleto = validarBoleto(jugadas.length, juego.reglas);
    if (!validacionBoleto.valido) {
      await transaction.rollback();
      return response.status(400).send({ mensaje: validacionBoleto.error });
    }

    let total = 0;
    for (const j of jugadas) {
      if (!j || typeof j.numero !== "string" || typeof j.monto !== "number") {
        await transaction.rollback();
        return response.status(400).send({ mensaje: "Formato de jugada inválido" });
      }

      if (!validarNumeroJuego(j.numero, juego.nombre)) {
        await transaction.rollback();
        return response.status(400).send({ mensaje: `Número inválido para ${juego.nombre}` });
      }

      const v = validarJugada(j.monto, juego.reglas);
      if (!v.valido) {
        await transaction.rollback();
        return response.status(400).send({ mensaje: v.error });
      }
      total += j.monto;
    }

    if (!cliente.billetera || parseFloat(cliente.billetera.saldo) < total) {
      await transaction.rollback();
      return response.status(400).send({ mensaje: "Saldo insuficiente" });
    }

    cliente.billetera.saldo = parseFloat(cliente.billetera.saldo) - total;
    await cliente.billetera.save({ transaction });

    await Transaccion.create(
      {
        billetera_id: cliente.billetera.id,
        tipo: "compra",
        monto: total,
        descripcion: `Compra boleto ${juego.nombre}`,
      },
      { transaction },
    );

    const boleto = await Boleto.create(
      { cliente_id: cliente.id, sorteo_id: sorteo.id, totalInvertido: total },
      { transaction },
    );

    for (const j of jugadas) {
      await Jugada.create({ boleto_id: boleto.id, numero: j.numero, monto: j.monto }, { transaction });
    }

    await transaction.commit();
    const jugadasDB = await Jugada.findAll({ where: { boleto_id: boleto.id } });
    return response.status(201).send({ mensaje: "Boleto comprado", boleto, jugadas: jugadasDB });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response.status(500).send({ mensaje: error.message });
  }
};

export const comprarBoletoBingo = async (request, response) => {
  const { id, cantidad = 1 } = request.body;

  if (!id) {
    return response.status(400).send({ mensaje: "id requerido" });
  }
  if (cantidad < 1 || cantidad > 100) {
    return response.status(400).send({ mensaje: "Cantidad inválida (1-100)" });
  }

  const transaction = await sequelize.transaction();
  try {
    const cliente = await Cliente.findOne({
      where: { usuario_id: request.usuario.id },
      include: [{ model: Billetera, as: "billetera" }],
    });
    if (!cliente) throw new Error("Cliente no encontrado");

    const juego = await Juego.findByPk(id);
    if (!juego) throw new Error("Juego no encontrado");
    if (juego.estado !== "activo") throw new Error("Juego inactivo");
    if (juego.nombre !== "Bingo Con Todo") throw new Error("Este endpoint es solo para Bingo");

    const sorteo = await obtenerSorteoPendiente(juego.id);
    if (!sorteo) throw new Error("No hay sorteo pendiente disponible");

    const costoUnitario = juego.reglas.costoBoleto || 10;
    const total = costoUnitario * cantidad;

    if (!cliente.billetera || parseFloat(cliente.billetera.saldo) < total) {
      await transaction.rollback();
      return response.status(400).send({ mensaje: "Saldo insuficiente" });
    }

    cliente.billetera.saldo = parseFloat(cliente.billetera.saldo) - total;
    await cliente.billetera.save({ transaction });

    await Transaccion.create(
      {
        billetera_id: cliente.billetera.id,
        tipo: "compra",
        monto: total,
        descripcion: `Compra ${cantidad} cartón(es) Bingo`,
      },
      { transaction },
    );

    const boletosCreados = [];

    for (let i = 0; i < cantidad; i++) {
      const boleto = await Boleto.create(
        { cliente_id: cliente.id, sorteo_id: sorteo.id, totalInvertido: costoUnitario },
        { transaction },
      );
      const { cartonPlano, cartonJSON } = crearCartonBingoAutomatico();
      await Jugada.create(
        { boleto_id: boleto.id, numero: cartonJSON, monto: costoUnitario, detallesBingo: { carton: cartonPlano } },
        { transaction },
      );
      boletosCreados.push(boleto);
    }

    await transaction.commit();
    return response.status(201).send({ mensaje: "Cartones comprados", total, boletos: boletosCreados });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response.status(500).send({ mensaje: error.message });
  }
};

export const listarBoletosCliente = async (request, response) => {
  try {
    const cliente = await Cliente.findOne({ where: { usuario_id: request.usuario.id } });
    if (!cliente) return response.status(404).send({ mensaje: "Cliente no encontrado" });

    const boletos = await Boleto.findAll({
      where: { cliente_id: cliente.id },
      include: [
        {
          model: Sorteo,
          as: "sorteo",
          attributes: ["id", "fechaHora", "estado", "resultado"],
          include: [{ model: Juego, as: "juego", attributes: ["nombre"] }],
        },
        { model: Jugada, as: "jugadas" },
      ],
      order: [["creado", "DESC"]],
    });

    return response.status(200).send({ boletos });
  } catch (error) {
    console.error(error);
    return response.status(500).send({ mensaje: error.message });
  }
};

export const detalleBoletoCliente = async (request, response) => {
  try {
    const cliente = await Cliente.findOne({ where: { usuario_id: request.usuario.id } });
    if (!cliente) return response.status(404).send({ mensaje: "Cliente no encontrado" });

    const boleto = await Boleto.findOne({
      where: { id: request.params.id, cliente_id: cliente.id },
      include: [
        {
          model: Sorteo,
          as: "sorteo",
          attributes: ["id", "fechaHora", "estado", "resultado"],
          include: [{ model: Juego, as: "juego", attributes: ["nombre"] }],
        },
        { model: Jugada, as: "jugadas" },
      ],
    });

    if (!boleto) return response.status(404).send({ mensaje: "Boleto no encontrado" });
    return response.status(200).send({ boleto });
  } catch (error) {
    console.error(error);
    return response.status(500).send({ mensaje: error.message });
  }
};
