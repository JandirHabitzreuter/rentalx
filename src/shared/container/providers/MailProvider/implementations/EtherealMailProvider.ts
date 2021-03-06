import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
    private cliente: Transporter;

    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });
                this.cliente = transporter;
            })
            .catch((err) => console.error(err));
    }

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = await this.cliente.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            text: body,
            html: body,
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Message URL: %s", nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };
