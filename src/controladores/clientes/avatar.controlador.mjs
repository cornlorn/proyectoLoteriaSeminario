import { Cliente } from "../../modelos/index.modelo.mjs";

export const cambiar = async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).send({ mensaje: "No se ha subido ningún archivo" });
    }

    const cliente = await Cliente.findOne({ where: { usuario_id: request.usuario.id } });

    if (!cliente) {
      return response.status(404).send({ mensaje: "Cliente no encontrado" });
    }

    cliente.avatar = `avatar/${request.file.filename}`;
    await cliente.save();

    response.status(200).send({ mensaje: "Avatar subido correctamente" });
  } catch (error) {
    console.error("Error al subir el avatar:", error);
    response.status(500).send({ mensaje: "Error al subir el avatar" });
  }
};
