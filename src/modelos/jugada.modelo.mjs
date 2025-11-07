import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Jugada = sequelize.define(
  "Jugada",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    numero: { type: DataTypes.STRING, allowNull: false }, // 2 o 3 dígitos
    monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    estado: { type: DataTypes.ENUM("pendiente", "ganadora", "perdedora"), defaultValue: "pendiente" },
    premio: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  },
  { tableName: "jugadas", timestamps: true, createdAt: "creada", updatedAt: "actualizada" },
);
