import { Usuario } from "../../modelos/index.modelo.mjs";

export const perfil = async (request, response) => {
  try {
    const usuario = await Usuario.findByPk(request.usuario.id, {
      attributes: { exclude: ["contrasena", "estado", "rol"] },
      include: [
        {
          association: "cliente",
          attributes: ["nombre", "apellido", "avatar"],
          include: [{ association: "billetera", attributes: ["saldo"] }],
        },
      ],
    });
    response.json({ usuario });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    response.status(500).send({ mensaje: "Error interno del servidor" });
  }
};
