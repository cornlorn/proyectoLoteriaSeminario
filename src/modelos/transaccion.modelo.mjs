import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Transaccion = sequelize.define(
  "Transaccion",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    tipo: { type: DataTypes.ENUM("deposito", "retiro", "compra", "premio"), allowNull: false },
    monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: "transacciones", timestamps: true, createdAt: "creada", updatedAt: "actualizada" },
);
