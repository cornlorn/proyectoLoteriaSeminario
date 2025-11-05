import { opciones, transportador } from "../config/correo.config.mjs";

export const enviarCorreo = async (destinatario, asunto, plantilla) => {
  try {
    await transportador.sendMail(opciones(destinatario, asunto, plantilla));
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};
