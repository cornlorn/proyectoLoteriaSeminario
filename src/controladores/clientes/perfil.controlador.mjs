import { Usuario, Billetera, Cliente, Transaccion, Boleto } from "../../modelos/index.modelo.mjs";

export const perfil = async (request, response) => {
  try {
    const usuario = await Usuario.findByPk(request.usuario.id, {
      attributes: ["id", "correo", "creado"],
      include: {
        association: "cliente",
        attributes: ["id", "nombre", "apellido", "avatar", "sexo", "telefono"],
        include: { association: "billetera", attributes: ["id", "saldo"] },
      },
    });

    if (!usuario) {
      return response.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const cliente = usuario.cliente;

    // Obtener últimos movimientos y boletos
    const [ultimosTransacciones, ultimosBoletos] = await Promise.all([
      cliente?.billetera
        ? Transaccion.findAll({
            where: { billetera_id: cliente.billetera.id },
            attributes: ["id", "tipo", "monto", "creada"],
            order: [["creada", "DESC"]],
            limit: 3,
          })
        : [],
      cliente
        ? Boleto.findAll({
            where: { cliente_id: cliente.id },
            attributes: ["id", "totalInvertido", "creado"],
            order: [["creado", "DESC"]],
            limit: 3,
          })
        : [],
    ]);

    const perfilBasico = {
      id: usuario.id,
      correo: usuario.correo,
      nombre: cliente?.nombre || null,
      apellido: cliente?.apellido || null,
      telefono: cliente?.telefono || null,
      sexo: cliente?.sexo || null,
      avatar: cliente?.avatar || null,
      saldo: cliente?.billetera?.saldo || 0,
      registrado: usuario.creado,
      recientes: {
        transacciones: ultimosTransacciones.map((t) => ({ id: t.id, tipo: t.tipo, monto: t.monto, fecha: t.creada })),
        boletos: ultimosBoletos.map((b) => ({ id: b.id, totalInvertido: b.totalInvertido, fecha: b.creado })),
      },
    };

    response.json(perfilBasico);
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    response.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
