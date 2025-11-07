export const generarNumeroGanador = (tipoJuego) => {
  let numero;

  if (tipoJuego === "La Diaria") {
    numero = Math.floor(Math.random() * 100);
    return numero.toString().padStart(2, "0");
  } else if (tipoJuego === "Juega Tres") {
    numero = Math.floor(Math.random() * 1000);
    return numero.toString().padStart(3, "0");
  } else if (tipoJuego === "Bingo Con Todo") {
    const numeros = new Set();
    while (numeros.size < 7) {
      const num = Math.floor(Math.random() * 21) + 1;
      numeros.add(num);
    }
    return JSON.stringify(Array.from(numeros).sort((a, b) => a - b));
  }

  throw new Error("Tipo de juego no válido");
};

export const validarNumeroJuego = (numero, tipoJuego) => {
  if (tipoJuego === "La Diaria") {
    return /^\d{2}$/.test(numero) && parseInt(numero) >= 0 && parseInt(numero) <= 99;
  } else if (tipoJuego === "Juega Tres") {
    return /^\d{3}$/.test(numero) && parseInt(numero) >= 0 && parseInt(numero) <= 999;
  } else if (tipoJuego === "Bingo Con Todo") {
    try {
      const numeros = JSON.parse(numero);
      if (!Array.isArray(numeros) || numeros.length !== 9) return false;

      const numerosUnicos = new Set(numeros);
      if (numerosUnicos.size !== 9) return false;

      return numeros.every((n) => Number.isInteger(n) && n >= 1 && n <= 21);
    } catch {
      return false;
    }
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
