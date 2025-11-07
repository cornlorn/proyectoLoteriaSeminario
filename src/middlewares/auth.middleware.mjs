import jwt from "jsonwebtoken";
import { Usuario } from "../modelos/usuario.modelo.mjs";

export const autenticar = async (request, response, next) => {
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
      return response.status(401).send({ mensaje: "Token inválido" });
    }

    request.usuario = usuario;
    next();
  } catch (error) {
    return response.status(401).send({ mensaje: "Token inválido" });
  }
};

export const verificarRol = (rol) => {
  return (request, response, next) => {
    if (!request.usuario) {
      return response.status(401).send({ mensaje: "No autenticado" });
    }

    if (request.usuario.rol !== rol) {
      return response.status(403).send({ mensaje: "No autorizado" });
    }

    next();
  };
};
