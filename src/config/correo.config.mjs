import nodemailer from "nodemailer";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

export const transportador = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

export const opciones = (destinatario, asunto, plantilla) => {
  return {
    from: `Equipo de ${process.env.APP_NAME} <${EMAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    html: plantilla,
  };
};
