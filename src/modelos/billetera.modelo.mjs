import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Billetera = sequelize.define(
  "Billetera",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    saldo: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  },
  { tableName: "billeteras", timestamps: true, createdAt: "creada", updatedAt: "actualizada" },
);
