import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.config.mjs";

export const Token = sequelize.define(
  "Token",
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    tipo: { type: DataTypes.ENUM("verificacion", "recuperacion"), allowNull: false },
    valor: { type: DataTypes.STRING, allowNull: false },
    expira: { type: DataTypes.DATE, allowNull: false },
  },
  { tableName: "tokens", timestamps: true, createdAt: "creado", updatedAt: "actualizado" },
);
