import { body } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const solicitar = [
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .normalizeEmail(),
];

export const validarSolicitar = withValidation(solicitar);

const restablecer = [
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

  body("contrasena")
    .notEmpty()
    .withMessage("La nueva contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Debe tener al menos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Debe contener al menos una mayúscula, una minúscula y un número"),
];

export const validarRestablecer = withValidation(restablecer);
