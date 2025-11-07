import { enviarCorreo } from "../../utils/correo.util.mjs";
import { plantillaClienteRegistro } from "./plantillas/cliente-registro.plantilla.mjs";

export const correoClienteRegistro = async (destinatario, codigo) => {
  const plantilla = plantillaClienteRegistro({ codigo });
  const asunto = `¡Bienvenido a ${process.env.APP_NAME}!`;
  await enviarCorreo(destinatario, asunto, plantilla);
};
