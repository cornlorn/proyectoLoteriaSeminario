import jwt from "jsonwebtoken";
import { Billetera, Cliente, Usuario } from "../../modelos/index.modelo.mjs";
import { compararContrasena } from "../../utils/password.util.mjs";

export const ingresar = async (request, response) => {
  try {
    const { correo, contrasena } = request.body;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return response.status(404).send({ error: "Credenciales inválidas" });
    }

    const contrasenaValida = await compararContrasena(contrasena, usuario.contrasena);

    if (!contrasenaValida) {
      return response.status(401).send({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return response.status(200).send({ mensaje: "Inicio de sesión exitoso", token: token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return response.status(500).send({ error: "Error interno del servidor" });
  }
};
