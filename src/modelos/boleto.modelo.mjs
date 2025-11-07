import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Boleto = sequelize.define(
  "Boleto",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fechaCompra: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    totalInvertido: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: "boletos", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
