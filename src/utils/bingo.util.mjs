export const generarCartonBingo = () => {
  const numeros = new Set();
  while (numeros.size < 9) {
    const num = Math.floor(Math.random() * 21) + 1;
    numeros.add(num);
  }
  return Array.from(numeros).sort((a, b) => a - b);
};

export const organizarCartonBingo = (numeros) => {
  if (!Array.isArray(numeros) || numeros.length !== 9) {
    throw new Error("El cartón debe tener 9 números");
  }

  return [
    [numeros[0], numeros[1], numeros[2]],
    [numeros[3], numeros[4], numeros[5]],
    [numeros[6], numeros[7], numeros[8]],
  ];
};

export const validarCartonBingo = (carton) => {
  try {
    if (!Array.isArray(carton) || carton.length !== 9) return false;

    const numerosUnicos = new Set(carton);
    if (numerosUnicos.size !== 9) return false;

    return carton.every((n) => Number.isInteger(n) && n >= 1 && n <= 21);
  } catch {
    return false;
  }
};

export const verificarLineasBingo = (carton, numerosGanadores) => {
  const cuadricula = organizarCartonBingo(carton);
  const lineasGanadoras = [];

  for (let i = 0; i < 3; i++) {
    if (cuadricula[i].every((num) => numerosGanadores.includes(num))) {
      lineasGanadoras.push({ tipo: "horizontal", fila: i + 1, numeros: cuadricula[i] });
    }
  }

  for (let i = 0; i < 3; i++) {
    const columna = [cuadricula[0][i], cuadricula[1][i], cuadricula[2][i]];
    if (columna.every((num) => numerosGanadores.includes(num))) {
      lineasGanadoras.push({ tipo: "vertical", columna: i + 1, numeros: columna });
    }
  }

  const diagonalPrincipal = [cuadricula[0][0], cuadricula[1][1], cuadricula[2][2]];
  if (diagonalPrincipal.every((num) => numerosGanadores.includes(num))) {
    lineasGanadoras.push({ tipo: "diagonal", direccion: "principal", numeros: diagonalPrincipal });
  }

  const diagonalSecundaria = [cuadricula[0][2], cuadricula[1][1], cuadricula[2][0]];
  if (diagonalSecundaria.every((num) => numerosGanadores.includes(num))) {
    lineasGanadoras.push({ tipo: "diagonal", direccion: "secundaria", numeros: diagonalSecundaria });
  }

  return {
    cantidadLineas: lineasGanadoras.length,
    lineas: lineasGanadoras,
    esGanador: lineasGanadoras.length > 0,
    cuadricula: cuadricula,
  };
};

export const calcularPremioBingo = (cantidadLineas) => {
  const premios = { 1: 20, 2: 500, 3: 5000, 4: 15000, 5: 30000 };

  return premios[cantidadLineas] || 0;
};

export const formatearCartonBingo = (carton) => {
  const cuadricula = organizarCartonBingo(carton);
  let texto = "\n┌─────┬─────┬─────┐\n";

  cuadricula.forEach((fila, index) => {
    const numerosFormateados = fila.map((n) => n.toString().padStart(2, " ")).join(" │ ");
    texto += `│ ${numerosFormateados} │\n`;

    if (index < 2) {
      texto += "├─────┼─────┼─────┤\n";
    }
  });

  texto += "└─────┴─────┴─────┘\n";
  return texto;
};

export const generarMultiplesCartones = (cantidad) => {
  const cartones = [];

  for (let i = 0; i < cantidad; i++) {
    cartones.push(generarCartonBingo());
  }

  return cartones;
};

export const validarNumerosGanadores = (numerosGanadores) => {
  try {
    if (!Array.isArray(numerosGanadores) || numerosGanadores.length !== 7) return false;

    const numerosUnicos = new Set(numerosGanadores);
    if (numerosUnicos.size !== 7) return false;

    return numerosGanadores.every((n) => Number.isInteger(n) && n >= 1 && n <= 21);
  } catch {
    return false;
  }
};
