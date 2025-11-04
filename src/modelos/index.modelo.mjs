import { Billetera } from "./billetera.modelo.mjs";
import { Cliente } from "./cliente.modelo.mjs";
import { Juego } from "./juego.modelo.mjs";
import { Modalidad } from "./modalidad.modelo.mjs";
import { Transaccion } from "./transaccion.modelo.mjs";
import { Usuario } from "./usuario.modelo.mjs";

Usuario.hasOne(Cliente, {
  foreignKey: "usuario_id",
  as: "cliente",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Cliente.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Cliente.hasOne(Billetera, {
  foreignKey: "cliente_id",
  as: "billetera",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Billetera.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });

Billetera.hasMany(Transaccion, {
  foreignKey: "billetera_id",
  as: "transacciones",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Transaccion.belongsTo(Billetera, { foreignKey: "billetera_id", as: "billetera" });

Juego.hasMany(Modalidad, {
  foreignKey: "juego_id",
  as: "modalidades",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Modalidad.belongsTo(Juego, { foreignKey: "juego_id", as: "juego" });

export { Billetera, Cliente, Juego, Modalidad, Transaccion, Usuario };
