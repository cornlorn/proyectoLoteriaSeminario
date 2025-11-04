import { Billetera } from "./billetera.modelo.mjs";
import { Cliente } from "./cliente.modelo.mjs";
import { Usuario } from "./usuario.modelo.mjs";

Usuario.hasOne(Cliente, { foreignKey: "usuario_id", as: "cliente" });
Cliente.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Cliente.hasOne(Billetera, { foreignKey: "cliente_id", as: "billetera" });
Billetera.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });

export { Cliente, Usuario, Billetera };
