export const plantillaClienteRegistro = ({ codigo }) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>¡Bienvenido a ${process.env.APP_NAME}!</title>
  </head>
  <body>
    <h1>${codigo}</h1>
  </body>
</html>
`;
