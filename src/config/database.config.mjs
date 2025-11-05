import { Sequelize } from "sequelize";

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

export async function database() {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada correctamente");
    await sequelize.sync({ alter: true });
    console.log("Modelos sincronizados correctamente");
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
  }
}
