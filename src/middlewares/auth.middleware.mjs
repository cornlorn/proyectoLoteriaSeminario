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
  } catch (error) {
    return response.status(500).send({ mensaje: "Error interno del servidor" });
  }
  next();
};
