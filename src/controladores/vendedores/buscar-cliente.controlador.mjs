import { Usuario } from "../../modelos/index.modelo.mjs";

export const buscarCliente = async (request, response) => {
  try {
    const { correo } = request.query;

    const usuario = await Usuario.findOne({
      where: { correo, rol: "cliente" },
      attributes: ["id", "correo", "verificado"],
      include: [
        {
          association: "cliente",
          attributes: ["id", "nombre", "apellido", "telefono"],
          include: [{ association: "billetera", attributes: ["id", "saldo"] }],
        },
      ],
    });

    if (!usuario) {
      return response.status(404).send({ mensaje: "Cliente no encontrado" });
    }

    if (!usuario.cliente) {
      return response.status(404).send({ mensaje: "El usuario no tiene un perfil de cliente asociado" });
    }

    response
      .status(200)
      .json({
        cliente: {
          id: usuario.cliente.id,
          nombre: usuario.cliente.nombre,
          apellido: usuario.cliente.apellido,
          telefono: usuario.cliente.telefono,
          correo: usuario.correo,
          verificado: usuario.verificado,
          billetera: usuario.cliente.billetera
            ? { id: usuario.cliente.billetera.id, saldo: Number(usuario.cliente.billetera.saldo) }
            : null,
        },
      });
  } catch (error) {
    console.error("Error al buscar cliente:", error);
    response.status(500).send({ mensaje: "Error interno del servidor" });
  }
};
