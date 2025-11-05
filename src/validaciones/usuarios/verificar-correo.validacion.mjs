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

  body("codigo")
    .notEmpty()
    .withMessage("El código es obligatorio")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("Debe tener exactamente 6 caracteres")
    .matches(/^[0-9]+$/)
    .withMessage("Debe contener solo números"),
];

export const validarVerificacionCorreo = withValidation(reglas);
