import { query } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const reglas = [
  query("juego").optional().isString().trim().isLength({ min: 1, max: 50 }).withMessage("juego inválido"),
];

export const validarListadoSorteosDisponibles = withValidation(reglas);
