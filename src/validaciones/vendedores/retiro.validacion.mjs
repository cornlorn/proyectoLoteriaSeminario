import { body } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const reglas = [
  body("id")
    .notEmpty()
    .withMessage("El ID de la billetera es obligatorio")
    .isUUID()
    .withMessage("El ID de la billetera debe ser un UUID válido"),

  body("monto")
    .notEmpty()
    .withMessage("El monto es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El monto debe ser un número mayor que 0"),
];

export const validarRetirar = withValidation(reglas);
