export const generarNumeroGanador = (tipoJuego) => {
  let numero;

  if (tipoJuego === "La Diaria") {
    numero = Math.floor(Math.random() * 100);
    return numero.toString().padStart(2, "0");
  } else if (tipoJuego === "Juega Tres") {
    numero = Math.floor(Math.random() * 1000);
    return numero.toString().padStart(3, "0");
  }

  throw new Error("Tipo de juego no válido");
};

export const validarNumeroJuego = (numero, tipoJuego) => {
  if (tipoJuego === "La Diaria") {
    return /^\d{2}$/.test(numero) && parseInt(numero) >= 0 && parseInt(numero) <= 99;
  } else if (tipoJuego === "Juega Tres") {
    return /^\d{3}$/.test(numero) && parseInt(numero) >= 0 && parseInt(numero) <= 999;
  }
  return false;
};

export const calcularPremio = (monto, multiplicador) => {
  return parseFloat((monto * multiplicador).toFixed(2));
};

export const validarJugada = (monto, reglas) => {
  if (monto < reglas.inversionMinima) {
    return { valido: false, error: `La inversión mínima es L. ${reglas.inversionMinima}` };
  }

  if (monto > reglas.inversionMaxima) {
    return { valido: false, error: `La inversión máxima es L. ${reglas.inversionMaxima}` };
  }

  return { valido: true };
};

export const validarBoleto = (cantidadJugadas, reglas) => {
  if (cantidadJugadas > reglas.limitePorBoleto) {
    return { valido: false, error: `El límite de jugadas por boleto es ${reglas.limitePorBoleto}` };
  }

  return { valido: true };
};
