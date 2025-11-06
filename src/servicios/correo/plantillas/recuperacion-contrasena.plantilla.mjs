export const plantillaRecuperacionContrasena = (codigo) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Recuperación de contraseña</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #333;">Recuperación de contraseña</h2>
    <p>Has solicitado restablecer tu contraseña. Utiliza el siguiente código para completar el proceso:</p>
    <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; text-align: center;">
      <h1 style="color: #007bff; margin: 0;">${codigo}</h1>
    </div>
    <p>Este código expirará en 1 hora.</p>
    <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo.</p>
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      Este es un correo automático, por favor no respondas a este mensaje.
    </p>
  </div>
</body>
</html>
`;
