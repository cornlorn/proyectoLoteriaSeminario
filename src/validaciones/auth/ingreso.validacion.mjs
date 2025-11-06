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

  body("contrasena")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Debe contener una mayúscula")
    .matches(/[a-z]/)
    .withMessage("Debe contener una minúscula")
    .matches(/[0-9]/)
    .withMessage("Debe contener un número"),
];

export const validarIngresar = withValidation(reglas);
