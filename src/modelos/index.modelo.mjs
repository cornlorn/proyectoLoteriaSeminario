import { Administrador } from "./administrador.modelo.mjs";
import { Billetera } from "./billetera.modelo.mjs";
import { Boleto } from "./boleto.modelo.mjs";
import { Cliente } from "./cliente.modelo.mjs";
import { Juego } from "./juego.modelo.mjs";
import { Jugada } from "./jugada.modelo.mjs";
import { Sorteo } from "./sorteo.modelo.mjs";
import { Token } from "./token.modelo.mjs";
import { Transaccion } from "./transaccion.modelo.mjs";
import { Usuario } from "./usuario.modelo.mjs";
import { Vendedor } from "./vendedor.modelo.mjs";

Usuario.hasOne(Administrador, {
  foreignKey: "usuario_id",
  as: "administrador",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Administrador.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Usuario.hasOne(Vendedor, { foreignKey: "usuario_id", as: "vendedor", onDelete: "CASCADE", onUpdate: "CASCADE" });
Vendedor.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Usuario.hasOne(Cliente, { foreignKey: "usuario_id", as: "cliente", onDelete: "CASCADE", onUpdate: "CASCADE" });
Cliente.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Usuario.hasMany(Token, { foreignKey: "usuario_id", as: "tokens", onDelete: "CASCADE", onUpdate: "CASCADE" });
Token.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Cliente.hasOne(Billetera, { foreignKey: "cliente_id", as: "billetera", onDelete: "CASCADE", onUpdate: "CASCADE" });
Billetera.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });

Billetera.hasMany(Transaccion, {
  foreignKey: "billetera_id",
  as: "transacciones",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Transaccion.belongsTo(Billetera, { foreignKey: "billetera_id", as: "billetera" });

Juego.hasMany(Sorteo, { foreignKey: "juego_id", as: "sorteos", onDelete: "CASCADE", onUpdate: "CASCADE" });
Sorteo.belongsTo(Juego, { foreignKey: "juego_id", as: "juego" });

Sorteo.hasMany(Boleto, { foreignKey: "sorteo_id", as: "boletos", onDelete: "CASCADE", onUpdate: "CASCADE" });
Boleto.belongsTo(Sorteo, { foreignKey: "sorteo_id", as: "sorteo" });

Cliente.hasMany(Boleto, { foreignKey: "cliente_id", as: "boletos", onDelete: "CASCADE", onUpdate: "CASCADE" });
Boleto.belongsTo(Cliente, { foreignKey: "cliente_id", as: "cliente" });

Boleto.hasMany(Jugada, { foreignKey: "boleto_id", as: "jugadas", onDelete: "CASCADE", onUpdate: "CASCADE" });
Jugada.belongsTo(Boleto, { foreignKey: "boleto_id", as: "boleto" });

export { Administrador, Billetera, Boleto, Cliente, Juego, Jugada, Sorteo, Token, Transaccion, Usuario, Vendedor };
