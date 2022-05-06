import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ad21f53d3f4b21",
      pass: "934c928899b49c"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, to, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <teste@feedget.com>',
            to: 'Teste <Teste@teste.com>',
            subject: 'Novo feedback',
            html: `<p>Tipo do feedback: ${body}</p>`
        });
    }
}