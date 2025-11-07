import { param, query } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

export const validarListarSorteos = withValidation([
  query("id").optional().isUUID().withMessage("juegoId debe ser un UUID válido"),
  query("estado")
    .optional()
    .isIn(["pendiente", "realizado", "anulado"])
    .withMessage("estado debe ser pendiente, realizado o anulado"),
  query("fecha").optional().isISO8601({ strict: true }).withMessage("fecha debe ser una fecha válida (YYYY-MM-DD)"),
]);

export const validarObtenerSorteoPorId = withValidation([
  param("id").isUUID().withMessage("El id debe ser un UUID válido"),
]);

export const validarAnularSorteo = withValidation([param("id").isUUID().withMessage("El id debe ser un UUID válido")]);
