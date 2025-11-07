import { query } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const reglas = [
  query("correo")
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .isEmail()
    .withMessage("El correo debe ser un correo electrónico válido"),
];

export const validarBuscarCliente = withValidation(reglas);
