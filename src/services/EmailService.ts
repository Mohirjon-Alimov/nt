import * as nodemailer from 'nodemailer';
import { EmailSentError } from '../definitions';

export interface SendEmailResponse {
  emailSent?: boolean;
}

export class EmailService {
  static async send(email: string, subject: string, text: string): Promise<SendEmailResponse> {
    try {
      const result: SendEmailResponse = {
        emailSent: false,
      };

      const transport = nodemailer.createTransport({
        service: 'gmail',
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_SERVER_USERNAME,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_SERVER_USERNAME,
        to: email,
        subject: subject,
        html: text,
      };

      const sendEmail = await transport.sendMail(mailOptions);

      result.emailSent = !!sendEmail;
      transport.close();
      return result;
    } catch (err) {
      console.error('Error sending email:', err);
      throw new EmailSentError();
    }
  }
}
