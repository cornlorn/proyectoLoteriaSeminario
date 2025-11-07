import { Juego } from "../../../modelos/index.modelo.mjs";

export const obtenerJuegos = async (_request, response) => {
  try {
    const juegos = await Juego.findAll({ order: [["nombre", "ASC"]] });

    response.status(200).json({ mensaje: "Juegos obtenidos exitosamente", juegos });
  } catch (error) {
    console.error("Error al obtener juegos:", error);
    response.status(500).json({ mensaje: "Error al obtener juegos" });
  }
};

export const actualizarReglas = async (request, response) => {
  try {
    const { id } = request.params;
    const { reglas } = request.body;

    const juego = await Juego.findByPk(id);

    if (!juego) {
      return response.status(404).json({ mensaje: "Juego no encontrado" });
    }

    const nuevasReglas = { ...juego.reglas, ...reglas };

    await juego.update({ reglas: nuevasReglas });

    response.status(200).json({ mensaje: "Reglas del juego actualizadas exitosamente", juego });
  } catch (error) {
    console.error("Error al actualizar reglas del juego:", error);
    response.status(500).json({ mensaje: "Error al actualizar reglas del juego" });
  }
};
