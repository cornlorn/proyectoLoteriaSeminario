import { enviarCorreo } from "../../utils/correo.util.mjs";
import { plantillaRecuperacionContrasena } from "./plantillas/recuperacion-contrasena.plantilla.mjs";

export const correoRecuperacionContrasena = async (correo, codigo) => {
  const asunto = "Recuperación de contraseña";
  const contenidoHtml = plantillaRecuperacionContrasena(codigo);

  await enviarCorreo(correo, asunto, contenidoHtml);
};