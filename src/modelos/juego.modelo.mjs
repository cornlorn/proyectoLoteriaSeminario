import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Juego = sequelize.define(
  "Juego",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING },
    estado: { type: DataTypes.ENUM("activo", "inactivo"), defaultValue: "activo" },
  },
  { tableName: "juegos", timestamps: true, createdAt: "creada", updatedAt: "actualizada" },
);
