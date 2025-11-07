import { enviarCorreo } from "../../utils/correo.util.mjs";
import { plantillaClienteRegistro } from "./plantillas/cliente-registro.plantilla.mjs";

import { plantillaCambioContrasena } from "./plantillas/cambio-contrasena.plantilla.mjs";
import { plantillaEnvioCredenciales } from "./plantillas/envio-credenciales.plantilla.mjs";
import { plantillaRecuperacionContrasena } from "./plantillas/recuperacion-contrasena.plantilla.mjs";
import { plantillaVerificacionCorreo } from "./plantillas/verificacion-correo.plantilla.mjs";

export const correoEnvioCredenciales = async (correo, nombre, contrasena) => {
  const plantilla = plantillaEnvioCredenciales({ nombre, correo, contrasena });
  const asunto = `Tus credenciales de acceso - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};

export const correoClienteRegistro = async (correo, nombre, codigo) => {
  const plantilla = plantillaClienteRegistro({ correo, nombre, codigo });
  const asunto = `¡Bienvenido/a a ${process.env.APP_NAME}!`;
  await enviarCorreo(correo, asunto, plantilla);
};

export const correoRecuperacionContrasena = async (correo, codigo) => {
  const plantilla = plantillaRecuperacionContrasena(codigo);
  const asunto = `Recuperación de contraseña - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};

export const correoVerificacion = async (correo, nombre, codigo) => {
  const plantilla = plantillaVerificacionCorreo();
  const asunto = `Verifica tu correo - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};

export const correoCambioContrasena = async (correo) => {
  const plantilla = plantillaCambioContrasena();
  const asunto = `Tu contraseña ha sido cambiada - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};
