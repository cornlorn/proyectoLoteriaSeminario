import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Sorteo = sequelize.define(
  "Sorteo",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fechaHora: { type: DataTypes.DATE, allowNull: false },
    resultado: { type: DataTypes.STRING, allowNull: true },
    estado: { type: DataTypes.ENUM("pendiente", "realizado", "anulado"), defaultValue: "pendiente" },
  },
  { tableName: "sorteos", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
