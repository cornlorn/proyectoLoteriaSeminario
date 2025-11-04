import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Cliente = sequelize.define(
  "Cliente",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    identificacion: { type: DataTypes.STRING, allowNull: false, unique: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "clientes", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
