import { body } from "express-validator";
import { withValidation } from "../../middlewares/validaciones.middleware.mjs";

const administrador = [
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .normalizeEmail(),
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 1 })
    .withMessage("El nombre debe tener al menos 1 carácter"),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 1 })
    .withMessage("El apellido debe tener al menos 1 carácter"),
];

const vendedor = [
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .normalizeEmail(),
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 1 })
    .withMessage("El nombre debe tener al menos 1 carácter"),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 1 })
    .withMessage("El apellido debe tener al menos 1 carácter"),
];

const cliente = [
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un correo válido")
    .normalizeEmail(),
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 1 })
    .withMessage("El nombre debe tener al menos 1 carácter"),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 1 })
    .withMessage("El apellido debe tener al menos 1 carácter"),

  body("sexo")
    .trim()
    .notEmpty()
    .withMessage("El sexo es obligatorio")
    .bail()
    .isIn(["masculino", "femenino"])
    .withMessage("El sexo debe ser masculino o femenino"),

  body("nacimiento")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria")
    .bail()
    .isDate({ format: "YYYY-MM-DD", strict: true })
    .withMessage("La fecha de nacimiento debe ser una fecha válida en formato YYYY-MM-DD"),

  body("telefono")
    .trim()
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .bail()
    .matches(/^[0-9]{8}$/)
    .withMessage("El teléfono debe tener exactamente 8 dígitos"),
];

export const validarRegistrarAdministrador = withValidation(administrador);
export const validarRegistrarVendedor = withValidation(vendedor);
export const validarRegistrarCliente = withValidation(cliente);
