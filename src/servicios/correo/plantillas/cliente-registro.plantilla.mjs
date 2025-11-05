export const plantillaBienvenidaCliente = (nombre, sexo, token) => {
  const saludo = sexo === "femenino" ? "Bienvenida" : "Bienvenido";
  const fecha = new Date().getFullYear();
  const app = "Loto";

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verificación de Código - ${app}</title>
  <!-- Fuentes: Roboto y Roboto Mono -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
  <style>
    /* VARIABLES DE COLOR (Neutrales) */
    :root {
      --bg-color: #f8fafc; /* Gris muy claro (fondo) */
      --card-bg: #ffffff;  /* Blanco (tarjeta principal) */
      --border-color: #e2e8f0; /* Gris pálido (bordes) */
      --text-dark: #1e293b; /* Slate Oscuro (títulos y texto principal) */
      --text-medium: #475569; /* Gris medio (texto de cuerpo) */
      --highlight-bg: #f1f5f9; /* Gris suave (caja de código) */
      --button-bg: #cbd5e1; /* Gris claro (botón) */
      --button-hover: #94a3b8; /* Gris medio (hover de botón) */
    }

    body {
      margin: 0;
      padding: 0;
      background-color: var(--bg-color);
      font-family: 'Roboto', sans-serif;
      color: var(--text-dark);
      line-height: 1.5;
    }

    /* Contenedor principal del email */
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      width: 90%;
      box-sizing: border-box;
    }

    /* Encabezado y logo */
    .header {
      text-align: center;
      padding: 24px 20px;
      background-color: var(--highlight-bg);
      border-bottom: 1px solid var(--border-color);
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-dark);
    }
    
    /* Sección de Contenido */
    .content {
      padding: 32px 30px;
      color: var(--text-medium);
    }
    .content h2 {
      margin-top: 0;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 20px;
    }
    .content p {
      margin: 16px 0;
      font-size: 15px;
      line-height: 1.7;
    }

    /* Caja del Código de Verificación */
    .code-box {
      text-align: center;
      background-color: var(--highlight-bg);
      border: 1px solid var(--border-color);
      padding: 20px 0;
      margin: 30px 0;
      font-family: 'Roboto Mono', monospace;
      font-size: 34px;
      letter-spacing: 6px;
      font-weight: 500;
      color: var(--text-dark);
      user-select: all;
      display: block;
    }

    /* Botón CTA (Call to Action) */
    .button-wrapper {
      text-align: center;
      margin-top: 30px;
    }
    .button {
      display: inline-block;
      background-color: var(--button-bg);
      color: var(--text-dark);
      text-decoration: none;
      padding: 12px 28px;
      font-weight: 600;
      font-size: 15px;
      border: 1px solid var(--button-hover);
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: var(--button-hover);
    }

    /* Pie de Página */
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: var(--text-medium);
      border-top: 1px solid var(--border-color);
      margin-top: 20px;
    }

    /* Media Query para móvil */
    @media (max-width: 480px) {
      .email-container {
        margin: 20px auto;
        width: 100%;
        border-left: none;
        border-right: none;
      }
      .content {
        padding: 20px;
      }
      .code-box {
        font-size: 28px;
        letter-spacing: 4px;
      }
    }
  </style>
</head>
<body>
  
  <!-- Contenedor general del email -->
  <div class="email-container">
    
    <!-- Encabezado con el logo/nombre de la app -->
    <div class="header">
      <h1>[ Logo Aquí ] ${app}</h1>
    </div>

    <!-- Contenido principal y mensaje -->
    <div class="content">
      <h2>¡${saludo} ${nombre} a ${app}!</h2>
      <p>Gracias por registrarte en nuestra plataforma. ¡Estamos felices de tenerte a bordo!</p>
      
      <p>Para asegurar tu cuenta y completar tu registro, por favor utiliza el siguiente código de verificación de 6 dígitos:</p>

      <!-- Código destacado -->
      <div class="code-box">${token}</div>

      <p>Para mayor comodidad, también puedes hacer clic en el botón de abajo para ser dirigido automáticamente a la página de verificación. Este código es válido por <strong>12 horas</strong>.</p>
      
      <!-- Botón de acción -->
      <div class="button-wrapper">
        <a href="#" class="button">Completar Mi Registro</a>
      </div>

      <p style="margin-top: 30px;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p>Saludos cordiales,<br>El equipo de ${app}.</p>
    </div>

    <!-- Pie de página con información legal -->
    <div class="footer">
      <p>Este es un correo electrónico automático. Por favor, no respondas a este mensaje.</p>
      <p>&copy; ${fecha} ${app}. Todos los derechos reservados. | <a href="#" style="color: var(--text-medium);">Política de Privacidad</a></p>
    </div>

  </div>
</body>
</html>`;
};
