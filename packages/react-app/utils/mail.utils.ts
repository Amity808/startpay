import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";
import SMTPConnection from "nodemailer/lib/smtp-connection";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  } as SMTPConnection.Options);

  type SendEmailDto = {
    sender: Mail.Address,
    receipient: Mail.Address,
    subject: string;
    message: string;
  }
  export const sendEmail = async (dto: SendEmailDto) => {
const { sender, receipient, subject, message } = dto;

    return await transporter.sendMail({
        from: sender,
        to: receipient,
        subject,
        html: message,
        text: message,
    })
  }