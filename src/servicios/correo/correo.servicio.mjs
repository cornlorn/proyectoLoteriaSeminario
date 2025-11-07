import { enviarCorreo } from "../../utils/correo.util.mjs";
import { plantillaClienteRegistro } from "./plantillas/cliente-registro.plantilla.mjs";

export const correoClienteRegistro = async (correo, nombre, codigo) => {
  const plantilla = plantillaClienteRegistro({ correo, nombre, codigo });
  const asunto = `¡Bienvenido/a a ${process.env.APP_NAME}!`;
  await enviarCorreo(correo, asunto, plantilla);
};
