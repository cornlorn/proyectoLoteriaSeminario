import cron from "node-cron";
import { sequelize } from "../config/database.config.mjs";
import { Billetera, Boleto, Cliente, Juego, Jugada, Sorteo, Transaccion, Usuario } from "../modelos/index.modelo.mjs";
import { calcularPremioBingo, verificarLineasBingo } from "../utils/bingo.util.mjs";
import { calcularPremio, generarNumeroGanador } from "../utils/juego.util.mjs";
import { correoNotificacionPremio } from "./correo/correo.servicio.mjs";

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

    cron.schedule(
      "30 0 * * *",
      async () => {
        console.log("Ejecutando mantenimiento de sorteos futuros...");
        await crearSorteosFuturos(7);
      },
      { timezone: "America/Tegucigalpa" },
    );

    console.log("Sorteos automáticos programados correctamente");
    console.log("Mantenimiento diario de sorteos programado (00:30)");
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

    if (juego.nombre === "Bingo Con Todo") {
      await procesarResultadosBingo(sorteo, numeroGanador, transaction);
    } else {
      await procesarResultados(sorteo, numeroGanador, juego.reglas.multiplicador, transaction);
    }

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

    const juego = await Juego.findByPk(sorteo.juego_id, { transaction });

    for (const boleto of boletos) {
      if (!boleto.jugadas || boleto.jugadas.length === 0) continue;

      let premioTotal = 0;

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
          premioTotal += premio;
        } else {
          await jugada.update({ estado: "perdedora" }, { transaction });
        }
      }

      if (premioTotal > 0) {
        const usuario = await Usuario.findByPk(boleto.cliente.usuario_id, { attributes: ["correo"], transaction });

        if (usuario) {
          correoNotificacionPremio(usuario.correo, boleto.cliente.nombre, juego.nombre, premioTotal).catch((error) => {
            console.error(`Error al enviar correo de premio a ${usuario.correo}:`, error);
          });
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

const procesarResultadosBingo = async (sorteo, numeroGanadorStr, transaction) => {
  try {
    const numerosGanadores = JSON.parse(numeroGanadorStr);

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

    const juego = await Juego.findByPk(sorteo.juego_id, { transaction });

    for (const boleto of boletos) {
      if (!boleto.jugadas || boleto.jugadas.length === 0) continue;

      let premioTotal = 0;

      for (const jugada of boleto.jugadas) {
        try {
          const carton = JSON.parse(jugada.numero);

          const resultado = verificarLineasBingo(carton, numerosGanadores);

          if (resultado.esGanador) {
            const premio = calcularPremioBingo(resultado.cantidadLineas);

            await jugada.update(
              {
                estado: "ganadora",
                premio: premio,
                detallesBingo: {
                  carton: carton,
                  cuadricula: resultado.cuadricula,
                  numerosGanadores: numerosGanadores,
                  cantidadLineas: resultado.cantidadLineas,
                  lineas: resultado.lineas,
                },
              },
              { transaction },
            );

            const billetera = boleto.cliente.billetera;
            await billetera.update({ saldo: parseFloat(billetera.saldo) + premio }, { transaction });

            await Transaccion.create(
              {
                billetera_id: billetera.id,
                tipo: "premio",
                monto: premio,
                descripcion: `Premio Bingo: ${resultado.cantidadLineas} línea(s)`,
              },
              { transaction },
            );

            totalGanadores++;
            totalPremios += premio;
            premioTotal += premio;

            console.log(
              `Ganador Bingo - Cliente: ${boleto.cliente.nombre}, Líneas: ${resultado.cantidadLineas}, Premio: L. ${premio}`,
            );
          } else {
            await jugada.update(
              {
                estado: "perdedora",
                detallesBingo: {
                  carton: carton,
                  cuadricula: resultado.cuadricula,
                  numerosGanadores: numerosGanadores,
                  cantidadLineas: 0,
                  lineas: [],
                },
              },
              { transaction },
            );
          }
        } catch (error) {
          console.error(`Error al procesar jugada ${jugada.id}:`, error);
          await jugada.update({ estado: "perdedora" }, { transaction });
        }
      }

      if (premioTotal > 0) {
        const usuario = await Usuario.findByPk(boleto.cliente.usuario_id, { attributes: ["correo"], transaction });

        if (usuario) {
          correoNotificacionPremio(usuario.correo, boleto.cliente.nombre, juego.nombre, premioTotal).catch((error) => {
            console.error(`Error al enviar correo de premio a ${usuario.correo}:`, error);
          });
        }
      }
    }

    console.log(`Bingo - Total ganadoras: ${totalGanadores}, Premios pagados: L. ${totalPremios.toFixed(2)}`);
  } catch (error) {
    console.error("Error al procesar resultados de Bingo:", error);
    throw error;
  }
};

export const crearSorteosFuturos = async (dias = 7) => {
  try {
    const juegos = await Juego.findAll({ where: { estado: "activo" } });
    let sorteosCreados = 0;
    let sorteosExistentes = 0;

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
            sorteosCreados++;
          } else {
            sorteosExistentes++;
          }
        }
      }
    }

    console.log(`Sorteos: ${sorteosCreados} creados, ${sorteosExistentes} ya existían (${dias} días)`);
  } catch (error) {
    console.error("Error al crear sorteos futuros:", error);
  }
};
