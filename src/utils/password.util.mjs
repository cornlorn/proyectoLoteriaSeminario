import bcrypt from "bcrypt";

export const generarContrasena = () => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint32Array(longitud);

  crypto.getRandomValues(array);

  let contrasena = "";
  for (let i = 0; i < longitud; i++) {
    const indice = array[i] % caracteres.length;
    contrasena += caracteres.charAt(indice);
  }

  return contrasena;
};

export const hashearContrasena = async (contrasena) => {
  return await bcrypt.hash(contrasena, 10);
};

export const compararContrasena = async (contrasena, hash) => {
  return await bcrypt.compare(contrasena, hash);
};
