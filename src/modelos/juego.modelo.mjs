import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Juego = sequelize.define(
  "Juego",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    reglas: { type: DataTypes.JSON, allowNull: false },
    estado: { type: DataTypes.ENUM("activo", "inactivo"), defaultValue: "activo" },
  },
  { tableName: "juegos", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
