import { Usuario } from "../../modelos/index.modelo.mjs";
import { correoCambioContrasena } from "../../servicios/correo/correo.servicio.mjs";
import { compararContrasena, hashearContrasena } from "../../utils/password.util.mjs";

export const cambiarContrasena = async (request, response) => {
  try {
    const { contrasenaActual, contrasenaNueva } = request.body;

    const usuario = await Usuario.findByPk(request.usuario.id, { attributes: ["id", "contrasena"] });

    if (!usuario) {
      return response.status(404).send({ mensaje: "Usuario no encontrado" });
    }

    const contrasenaValida = await compararContrasena(contrasenaActual, usuario.contrasena);

    if (!contrasenaValida) {
      return response.status(401).send({ mensaje: "La contraseña actual es incorrecta" });
    }

    const contrasenaHasheada = await hashearContrasena(contrasenaNueva);
    await usuario.update({ contrasena: contrasenaHasheada });

    await correoCambioContrasena(usuario.correo);
    response.status(200).send({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    response.status(500).send({ mensaje: "Error interno del servidor" });
  }
};
