import { body, param } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const esHoraValida = (valor) => /^([01]\d|2[0-3]):[0-5]\d$/.test(valor);

export const validarObtenerJuegoPorId = withValidation([
  param("id").isUUID().withMessage("El id debe ser un UUID válido"),
]);

export const validarActualizarReglasJuego = withValidation([
  param("id").isUUID().withMessage("El id debe ser un UUID válido"),
  body("reglas").optional().isObject().withMessage("reglas debe ser un objeto"),
  body("reglas.inversionMinima")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("inversionMinima debe ser un número mayor a 0"),
  body("reglas.inversionMaxima")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("inversionMaxima debe ser un número mayor a 0"),
  body("reglas.multiplicador").optional().isFloat({ gt: 0 }).withMessage("multiplicador debe ser un número mayor a 0"),
  body("reglas.limitePorBoleto")
    .optional()
    .isInt({ gt: 0, lt: 51 })
    .withMessage("limitePorBoleto debe ser un entero positivo razonable (<= 50)"),
  body("reglas.horarios")
    .optional()
    .isArray({ min: 1 })
    .withMessage("horarios debe ser un arreglo con al menos un elemento")
    .bail()
    .custom((arr) => arr.every(esHoraValida))
    .withMessage("Cada horario debe tener formato HH:MM 24h"),
]);

export const validarCambiarEstadoJuego = withValidation([
  param("id").isUUID().withMessage("El id debe ser un UUID válido"),
  body("estado")
    .notEmpty()
    .withMessage("El estado es obligatorio")
    .bail()
    .isIn(["activo", "inactivo"])
    .withMessage("Estado no válido"),
]);
