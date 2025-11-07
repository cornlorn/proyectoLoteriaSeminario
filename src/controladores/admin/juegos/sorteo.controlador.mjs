import { Juego, Sorteo } from "../../../modelos/index.modelo.mjs";

export const obtenerSorteos = async (_request, response) => {
  try {
    const sorteos = await Sorteo.findAll({
      include: [{ model: Juego, as: "juego", attributes: ["id", "nombre"] }],
      order: [["fechaHora", "DESC"]],
    });

    response.status(200).json({ mensaje: "Sorteos obtenidos exitosamente", sorteos });
  } catch (error) {
    console.error("Error al obtener sorteos:", error);
    response.status(500).json({ mensaje: "Error al obtener sorteos" });
  }
};
