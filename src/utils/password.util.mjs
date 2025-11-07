import bcrypt from "bcrypt";
import crypto from "crypto";

export const generarContrasena = (longitud = 12) => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let contrasena = "";
  for (let i = 0; i < longitud; i++) {
    const indice = crypto.randomInt(0, caracteres.length);
    contrasena += caracteres.charAt(indice);
  }
  return contrasena;
};

export const generarCodigo = () => {
  const numero = crypto.randomInt(0, 1000000);
  return numero.toString().padStart(6, "0");
};

export const hashearContrasena = (contrasena) => bcrypt.hash(contrasena, 10);
export const compararContrasena = (contrasena, hash) => bcrypt.compare(contrasena, hash);
