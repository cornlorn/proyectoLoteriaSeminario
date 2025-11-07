import { Juego, Sorteo } from "../../modelos/index.modelo.mjs";
import { Op } from "sequelize";

export const listarSorteosDisponibles = async (_req, res) => {
  try {
    const ahora = new Date();
    const sorteos = await Sorteo.findAll({
      where: { estado: "pendiente", fechaHora: { [Op.gte]: ahora } },
      include: [{ model: Juego, as: "juego", attributes: ["id", "nombre", "estado"], where: { estado: "activo" } }],
      order: [["fechaHora", "ASC"]],
      attributes: ["id", "fechaHora", "estado"],
    });

    const respuesta = sorteos.map((sorteo) => ({
      id: sorteo.id,
      fechaHora: sorteo.fechaHora,
      juego: { id: sorteo.juego.id, nombre: sorteo.juego.nombre },
    }));
    return res.status(200).send({ sorteos: respuesta });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mensaje: "Error al listar sorteos" });
  }
};
