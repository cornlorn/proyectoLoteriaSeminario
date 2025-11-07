import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Administrador = sequelize.define(
  "Administrador",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "administradores", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
