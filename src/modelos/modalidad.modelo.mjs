import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Modalidad = sequelize.define(
  "Modalidad",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    rango_minimo: { type: DataTypes.INTEGER, allowNull: false },
    rango_maximo: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "modalidades", timestamps: true, createdAt: "creada", updatedAt: "actualizada" },
);
