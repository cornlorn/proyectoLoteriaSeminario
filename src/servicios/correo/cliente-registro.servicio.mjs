import { enviarCorreo } from "../../utils/correo.util.mjs";
import { plantillaBienvenidaCliente } from "./plantillas/cliente-registro.plantilla.mjs";

export const correoClienteRegistro = async (destinatario, nombre, sexo, token) => {
  const asunto =
    sexo === "femenino" ? "¡Bienvenida a nuestra plataforma!" : "¡Bienvenido a nuestra plataforma!";
  const plantilla = plantillaBienvenidaCliente(nombre, sexo, token);
  await enviarCorreo(destinatario, asunto, plantilla);
};
