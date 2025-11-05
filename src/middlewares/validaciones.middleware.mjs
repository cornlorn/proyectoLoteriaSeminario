import { validationResult } from "express-validator";

export const withValidation = (validations) => {
  return [
    ...validations,
    (request, response, next) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response
          .status(400)
          .json({ errores: errors.array().map((error) => ({ mensaje: error.msg })) });
      }
      next();
    },
  ];
};
