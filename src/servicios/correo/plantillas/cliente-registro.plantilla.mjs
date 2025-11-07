export const plantillaClienteRegistro = ({ correo, nombre, codigo }) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>¡Bienvenido/a a ${process.env.APP_NAME}!</title>

    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&family=IBM+Plex+Mono:wght@700&display=swap"
      rel="stylesheet"
    />

    <style>
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
        border: 0;

        font-family: "IBM Plex Sans", Arial, sans-serif;
        line-height: 1.6;
      }

      body {
        background-color: #f7f7f7;
        padding: 20px;
      }

      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;

        box-shadow: 0 0 0 1px #e0e0e0;
      }

      .content-area {
        padding: 30px;
      }

      .header {
        background-color: #1a1a1a;
        color: #ffffff;
        padding: 25px 30px;
        font-size: 24px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .paragraph {
        font-size: 16px;
        color: #333333;
        margin-bottom: 20px;
      }

      .code-container {
        background-color: #f2f2f2;
        padding: 20px;
        text-align: center;
        margin: 25px 0;
        border: 2px solid #e0e0e0;
      }

      .code-title {
        font-size: 14px;
        color: #555555;
        margin-bottom: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .code {
        font-size: 30px;
        font-weight: bold;
        color: #1a1a1a;
        letter-spacing: 5px;

        font-family: "IBM Plex Mono", monospace;
        display: block;
      }

      .footer {
        text-align: center;
        font-size: 12px;
        color: #777777;
        padding: 30px;
        border-top: 1px solid #e0e0e0;
      }

      @media screen and (max-width: 525px) {
        .content-area {
          padding: 15px;
        }
        .header {
          font-size: 20px;
        }
        .code {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="container">
            <tr>
              <td class="header">${process.env.APP_NAME}</td>
            </tr>

            <tr>
              <td class="content-area">
                <p class="paragraph">Hola ${nombre},</p>
                <p class="paragraph">
                  Te damos una cordial bienvenida a ${process.env.APP_NAME}, tu destino para participar en los sorteos
                  más emocionantes. ¡Estás a un paso de empezar a jugar y ganar!
                </p>
                <p class="paragraph">
                  Para asegurar tu cuenta y verificar tu correo electrónico, por favor, utiliza el siguiente código
                  cuando inicies sesión por primera vez:
                </p>

                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td class="code-container">
                      <div class="code-title">TU CÓDIGO DE VERIFICACIÓN</div>
                      <div class="code">${codigo}</div>
                    </td>
                  </tr>
                </table>

                <p class="paragraph">Este código solo es válido por <b>12 horas</b>. ¡No lo compartas con nadie!</p>

                <p class="paragraph">
                  Puedes iniciar sesión en tu aplicación. Si tienes alguna pregunta, no dudes en contactar a nuestro
                  equipo de soporte.
                </p>
                <p class="paragraph" style="margin-bottom: 0">¡Mucha suerte en tu primer sorteo!</p>
              </td>
            </tr>

            <tr>
              <td class="footer">
                <p>&copy; 2025 ${process.env.APP_NAME}. Todos los derechos reservados.</p>
                <p>Este correo electrónico fue enviado a ${correo}.</p>
                <p>Si no te registraste, por favor ignora este mensaje.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
