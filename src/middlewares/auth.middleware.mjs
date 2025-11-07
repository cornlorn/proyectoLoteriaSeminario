import jwt from "jsonwebtoken";
import { Usuario } from "../modelos/usuario.modelo.mjs";

export const proteger = (rolesPermitidos = []) => {
  return async (request, response, next) => {
    try {
      const token = request.headers.authorization?.split(" ")[1];
      if (!token) {
        return response.status(401).send({ mensaje: "No se proporcionó un token" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await Usuario.findByPk(decoded.id, {
        attributes: ["id", "correo", "rol", "verificado"],
      });

      if (!usuario) {
        return response.status(401).send({ mensaje: "Token inválido o usuario no encontrado" });
      }

      request.usuario = usuario;

      if (!rolesPermitidos || rolesPermitidos.length === 0) {
        return next();
      }

      const roles = Array.isArray(rolesPermitidos) ? rolesPermitidos : [rolesPermitidos];

      if (!roles.includes(usuario.rol)) {
        return response.status(403).send({ mensaje: "No autorizado para este recurso" });
      }

      next();
    } catch (error) {
      console.error("Error en autenticación:", error);
      return response.status(401).send({ mensaje: "Token inválido o expirado" });
    }
  };
};
