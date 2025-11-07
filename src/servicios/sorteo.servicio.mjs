import cron from "node-cron";
import { sequelize } from "../config/database.config.mjs";
import { Billetera, Boleto, Cliente, Juego, Jugada, Sorteo, Transaccion } from "../modelos/index.modelo.mjs";
import { calcularPremio, generarNumeroGanador } from "../utils/juego.util.mjs";

export const programarSorteosAutomaticos = async () => {
  try {
    const juegos = await Juego.findAll({ where: { estado: "activo" } });

    for (const juego of juegos) {
      const { nombre, reglas } = juego;

      if (reglas.horarios && Array.isArray(reglas.horarios)) {
        reglas.horarios.forEach((horario) => {
          programarSorteo(juego, horario);
        });
      }
    }

    console.log("Sorteos automáticos programados correctamente");
  } catch (error) {
    console.error("Error al programar sorteos automáticos:", error);
  }
};

const programarSorteo = (juego, horario) => {
  const [hora, minuto] = horario.split(":");

  const cronExpression = `${minuto} ${hora} * * *`;

  cron.schedule(
    cronExpression,
    async () => {
      console.log(`Ejecutando sorteo de ${juego.nombre} a las ${horario}`);
      await ejecutarSorteo(juego);
    },
    { timezone: "America/Tegucigalpa" },
  );

  console.log(`Sorteo programado: ${juego.nombre} a las ${horario}`);
};

const ejecutarSorteo = async (juego) => {
  const transaction = await sequelize.transaction();

  try {
    const ahora = new Date();
    const sorteo = await Sorteo.findOne({
      where: { juego_id: juego.id, estado: "pendiente" },
      order: [["fechaHora", "ASC"]],
      transaction,
    });

    if (!sorteo) {
      console.log(`No hay sorteos pendientes para ${juego.nombre}`);
      await transaction.rollback();
      return;
    }

    const numeroGanador = generarNumeroGanador(juego.nombre);

    await sorteo.update({ resultado: numeroGanador, estado: "realizado" }, { transaction });

    console.log(`Número ganador de ${juego.nombre}: ${numeroGanador}`);

    await procesarResultados(sorteo, numeroGanador, juego.reglas.multiplicador, transaction);

    await transaction.commit();
    console.log(`Sorteo de ${juego.nombre} completado exitosamente`);
  } catch (error) {
    await transaction.rollback();
    console.error(`Error al ejecutar sorteo de ${juego.nombre}:`, error);
  }
};

const procesarResultados = async (sorteo, numeroGanador, multiplicador, transaction) => {
  try {
    const boletos = await Boleto.findAll({
      where: { sorteo_id: sorteo.id },
      include: [
        { model: Jugada, as: "jugadas", where: { estado: "pendiente" }, required: false },
        { model: Cliente, as: "cliente", include: [{ model: Billetera, as: "billetera" }] },
      ],
      transaction,
    });

    let totalGanadores = 0;
    let totalPremios = 0;

    for (const boleto of boletos) {
      if (!boleto.jugadas || boleto.jugadas.length === 0) continue;

      for (const jugada of boleto.jugadas) {
        const esGanadora = jugada.numero === numeroGanador;

        if (esGanadora) {
          const premio = calcularPremio(parseFloat(jugada.monto), multiplicador);

          await jugada.update({ estado: "ganadora", premio: premio }, { transaction });

          const billetera = boleto.cliente.billetera;
          await billetera.update({ saldo: parseFloat(billetera.saldo) + premio }, { transaction });

          await Transaccion.create({ billetera_id: billetera.id, tipo: "premio", monto: premio }, { transaction });

          totalGanadores++;
          totalPremios += premio;
        } else {
          await jugada.update({ estado: "perdedora" }, { transaction });
        }
      }
    }

    console.log(`Total de jugadas ganadoras: ${totalGanadores}`);
    console.log(`Total de premios pagados: L. ${totalPremios.toFixed(2)}`);
  } catch (error) {
    console.error("Error al procesar resultados:", error);
    throw error;
  }
};

export const crearSorteosFuturos = async (dias = 7) => {
  try {
    const juegos = await Juego.findAll({ where: { estado: "activo" } });

    for (const juego of juegos) {
      const { reglas } = juego;

      if (!reglas.horarios || !Array.isArray(reglas.horarios)) continue;

      for (let i = 0; i < dias; i++) {
        for (const horario of reglas.horarios) {
          const [hora, minuto] = horario.split(":");
          const fechaSorteo = new Date();
          fechaSorteo.setDate(fechaSorteo.getDate() + i);
          fechaSorteo.setHours(parseInt(hora), parseInt(minuto), 0, 0);

          const sorteoExistente = await Sorteo.findOne({ where: { juego_id: juego.id, fechaHora: fechaSorteo } });

          if (!sorteoExistente) {
            await Sorteo.create({ juego_id: juego.id, fechaHora: fechaSorteo, estado: "pendiente" });
          }
        }
      }
    }

    console.log(`Sorteos futuros creados para ${dias} días`);
  } catch (error) {
    console.error("Error al crear sorteos futuros:", error);
  }
};
