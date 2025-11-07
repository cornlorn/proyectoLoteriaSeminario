import { Juego } from "../modelos/index.modelo.mjs";

export const inicializarJuegos = async () => {
  try {
    const juegosExistentes = await Juego.count();

    if (juegosExistentes > 0) {
      console.log("Los juegos ya están inicializados");
      return;
    }

    await Juego.create({
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
    });

    await Juego.create({
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
    });

    console.log("Juegos inicializados correctamente");
  } catch (error) {
    console.error("Error al inicializar juegos:", error);
    throw error;
  }
};
