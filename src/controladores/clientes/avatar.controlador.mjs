import { Usuario } from "../../modelos/index.modelo.mjs";

export const cambiar = async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).send({ mensaje: "No se ha subido ningún archivo" });
    }

    const usuario = await Usuario.findByPk(request.usuario.id);

    if (!usuario) {
      return response.status(404).send({ mensaje: "Usuario no encontrado" });
    }

    usuario.avatar = `/avatar/${request.file.filename}`;
    console.log(`Ruta del avatar guardada: ${usuario.avatar}`);
    await usuario.save();

    response.status(200).send({ mensaje: "Avatar subido correctamente" });
  } catch (error) {
    console.error("Error al subir el avatar:", error);
    response.status(500).send({ mensaje: "Error al subir el avatar" });
  }
};
