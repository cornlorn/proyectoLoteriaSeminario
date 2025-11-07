import { Juego } from "../modelos/index.modelo.mjs";

export const inicializarJuegos = async () => {
  try {
    const juegosConfig = [
      {
        nombre: "La Diaria",
        reglas: {
          objetivo: "Acertar un número de dos dígitos (00 al 99)",
          horarios: ["11:00", "15:00", "21:00"],
          inversionMinima: 5,
          inversionMaxima: 500,
          multiplicador: 60,
          limitePorBoleto: 10,
          digitosNumero: 2,
        },
        estado: "activo",
      },
      {
        nombre: "Juega Tres",
        reglas: {
          objetivo: "Acertar un número de tres dígitos (000 al 999)",
          horarios: ["11:00", "15:00", "21:00"],
          inversionMinima: 5,
          inversionMaxima: 500,
          multiplicador: 600,
          limitePorBoleto: 10,
          digitosNumero: 3,
        },
        estado: "activo",
      },
      {
        nombre: "Bingo Con Todo",
        reglas: {
          objetivo:
            "Lograr líneas (vertical, horizontal o diagonal) con los 7 números ganadores sorteados (del 01 al 21), comparados con los 9 números del cartón",
          horarios: ["16:00"],
          inversionMinima: 10,
          inversionMaxima: 10,
          costoBoleto: 10,
          limitePorBoleto: 100,
          rangoNumeros: { min: 1, max: 21 },
          numerosEnCarton: 9,
          numerosGanadores: 7,
          premios: { 1: 20, 2: 500, 3: 5000, 4: 15000, 5: 30000 },
          tipoBoleto: "carton",
        },
        estado: "activo",
      },
    ];

    let juegosCreados = 0;
    let juegosExistentes = 0;

    for (const juegoConfig of juegosConfig) {
      const existe = await Juego.findOne({ where: { nombre: juegoConfig.nombre } });

      if (!existe) {
        await Juego.create(juegoConfig);
        console.log(`Juego '${juegoConfig.nombre}' creado`);
        juegosCreados++;
      } else {
        juegosExistentes++;
      }
    }

    if (juegosCreados > 0) {
      console.log(`Juegos inicializados: ${juegosCreados} creados, ${juegosExistentes} ya existían`);
    } else {
      console.log("Los juegos ya están inicializados");
    }
  } catch (error) {
    console.error("Error al inicializar juegos:", error);
    throw error;
  }
};
