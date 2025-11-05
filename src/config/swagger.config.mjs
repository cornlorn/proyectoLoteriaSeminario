import swaggerJSDoc from "swagger-jsdoc";

const { SERVER_PORT } = process.env;

const opciones = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST de lotería",
      version: "1.0.0",
      description: "API para gestionar usuarios, juegos y compras en la aplicación de lotería",
    },
    servers: [
      { url: `http://localhost:${SERVER_PORT}/api`, description: "Servidor de desarrollo" },
    ],
    components: {
      securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["src/rutas/**/*.{js,mjs}", "src/docs/**/*.yaml"],
};

export const specs = swaggerJSDoc(opciones);
