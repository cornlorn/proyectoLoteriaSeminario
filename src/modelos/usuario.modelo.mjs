import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    correo: { type: DataTypes.STRING, allowNull: false, unique: true },
    contrasena: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.ENUM("activo", "inactivo"), defaultValue: "activo" },
    rol: { type: DataTypes.ENUM("cliente", "vendedor", "administrador"), defaultValue: "cliente" },
    verificado: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "usuarios", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
