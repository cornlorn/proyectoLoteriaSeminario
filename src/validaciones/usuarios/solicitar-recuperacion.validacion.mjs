import { body } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const reglas = [
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .normalizeEmail(),
];

export const validarSolicitudRecuperacion = withValidation(reglas);
