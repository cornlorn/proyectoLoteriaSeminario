import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Cliente = sequelize.define(
  "Cliente",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    sexo: { type: DataTypes.ENUM("masculino", "femenino"), allowNull: false },
    nacimiento: { type: DataTypes.DATEONLY, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "clientes", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
