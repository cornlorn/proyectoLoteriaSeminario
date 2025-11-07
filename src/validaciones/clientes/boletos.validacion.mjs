import { body, param } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const reglasCompraNumerica = [
  body("id").isUUID().withMessage("id inválido"),
  body("jugadas").isArray({ min: 1 }).withMessage("jugadas debe ser un arreglo con al menos 1 elemento"),
  body("jugadas.*.numero").isString().trim().notEmpty().withMessage("numero requerido"),
  body("jugadas.*.monto").isFloat({ gt: 0 }).withMessage("monto debe ser mayor que 0"),
];

const reglasCompraBingo = [
  body("id").isUUID().withMessage("id inválido"),
  body("cantidad").optional().isInt({ min: 1, max: 10 }).withMessage("cantidad debe ser entre 1 y 10"),
];

const reglasDetalleBoleto = [param("id").isUUID().withMessage("id inválido")];

export const validarCompraNumerica = withValidation(reglasCompraNumerica);
export const validarCompraBingo = withValidation(reglasCompraBingo);
export const validarDetalleBoleto = withValidation(reglasDetalleBoleto);
