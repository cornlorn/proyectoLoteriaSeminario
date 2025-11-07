import { body } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const reglas = [
  body("contrasenaActual").notEmpty().withMessage("La contraseña actual es obligatoria"),

  body("contrasenaNueva")
    .notEmpty()
    .withMessage("La nueva contraseña es obligatoria")
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

export const validarCambiarContrasena = withValidation(reglas);
