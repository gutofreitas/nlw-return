export interface SendMailData {
    subject: string;
    body: string;
    to: string;
}

export interface MailAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
}