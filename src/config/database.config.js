const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

exports.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

exports.database = async () => {
  try {
    await this.sequelize.authenticate();
    console.log("Base de datos conectada correctamente");
    await this.sequelize.sync({ alter: true });
    console.log("Modelos sincronizados correctamente");
  } catch (error) {
    console.error("Error en la conexión a la base de datos:", error);
  }
};
