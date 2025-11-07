import { Billetera } from "./billetera.modelo.mjs";
import { Cliente } from "./cliente.modelo.mjs";
import { Token } from "./token.modelo.mjs";
import { Transaccion } from "./transaccion.modelo.mjs";
import { Usuario } from "./usuario.modelo.mjs";
import { Administrador } from "./administrador.modelo.mjs";

Usuario.hasOne(Administrador, {
  foreignKey: "usuario_id",
  as: "administrador",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Administrador.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Usuario.hasOne(Cliente, {
  foreignKey: "usuario_id",
  as: "cliente",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Cliente.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Usuario.hasMany(Token, {
  foreignKey: "usuario_id",
  as: "tokens",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Token.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

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

export { Billetera, Cliente, Token, Transaccion, Usuario, Administrador };
