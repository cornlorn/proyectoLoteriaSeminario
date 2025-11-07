import fs from "fs";
import path from "path";
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

    const directorioCliente = path.resolve("public", "profile", String(request.usuario.id));
    try {
      await fs.promises.mkdir(directorioCliente, { recursive: true });
      const files = await fs.promises.readdir(directorioCliente);
      await Promise.all(
        files
          .filter((f) => f !== request.file.filename)
          .map((f) =>
            fs.promises.unlink(path.join(directorioCliente, f)).catch((err) => {
              if (err.code !== "ENOENT") {
                console.error("Error al eliminar archivo antiguo del avatar:", err);
              }
            }),
          ),
      );
    } catch (cleanupErr) {
      console.error("Error al limpiar la carpeta del usuario:", cleanupErr);
    }

    cliente.avatar = `profile/${request.usuario.id}/${request.file.filename}`;
    await cliente.save();

    response.status(200).send({ mensaje: "Avatar subido correctamente" });
  } catch (error) {
    console.error("Error al subir el avatar:", error);
    response.status(500).send({ mensaje: "Error al subir el avatar" });
  }
};

export const eliminar = async (request, response) => {
  try {
    const cliente = await Cliente.findOne({ where: { usuario_id: request.usuario.id } });

    if (!cliente) {
      return response.status(404).send({ mensaje: "Cliente no encontrado" });
    }

    if (cliente.avatar) {
      const avatarPath = path.resolve("public", cliente.avatar);
      fs.unlink(avatarPath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error al eliminar el archivo del avatar:", err);
        }
      });
    }

    cliente.avatar = null;
    await cliente.save();

    response.status(200).send({ mensaje: "Avatar eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el avatar:", error);
    response.status(500).send({ mensaje: "Error al eliminar el avatar" });
  }
};
