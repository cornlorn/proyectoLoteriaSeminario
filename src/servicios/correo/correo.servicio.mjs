import { enviarCorreo } from "../../utils/correo.util.mjs";
import { plantillaClienteRegistro } from "./plantillas/cliente-registro.plantilla.mjs";

import { plantillaCambioContrasena } from "./plantillas/cambio-contrasena.plantilla.mjs";
import { plantillaEnvioCredenciales } from "./plantillas/envio-credenciales.plantilla.mjs";
import { plantillaNotificacionCompra } from "./plantillas/notificacion-compra.plantilla.mjs";
import { plantillaNotificacionDeposito } from "./plantillas/notificacion-deposito.plantilla.mjs";
import { plantillaNotificacionPremio } from "./plantillas/notificacion-premio.plantilla.mjs";
import { plantillaNotificacionRetiro } from "./plantillas/notificacion-retiro.plantilla.mjs";
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

export const correoNotificacionDeposito = async (correo, nombre, monto, saldoNuevo) => {
  const plantilla = plantillaNotificacionDeposito({ nombre, monto, saldoNuevo });
  const asunto = `Depósito recibido - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};

export const correoNotificacionRetiro = async (correo, nombre, monto, saldoNuevo) => {
  const plantilla = plantillaNotificacionRetiro({ nombre, monto, saldoNuevo });
  const asunto = `Retiro procesado - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};

export const correoNotificacionCompra = async (correo, nombre, nombreJuego, monto, saldoNuevo) => {
  const plantilla = plantillaNotificacionCompra({ nombre, nombreJuego, monto, saldoNuevo });
  const asunto = `Compra de boleto confirmada - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};

export const correoNotificacionPremio = async (correo, nombre, nombreJuego, monto) => {
  const plantilla = plantillaNotificacionPremio({ nombre, nombreJuego, monto });
  const asunto = `¡Felicidades! Has ganado un premio - ${process.env.APP_NAME}`;
  await enviarCorreo(correo, asunto, plantilla);
};
