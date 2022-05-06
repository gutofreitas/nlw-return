import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksReposirtory } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksrepository: FeedbacksReposirtory,
        private mailAdapter: MailAdapter
    ){}

    async handle(request :SubmitFeedbackUseCaseRequest) {
        const {type, comment, screenshot} = request;
        
        if(!type) {
            throw new Error("Feedback type is required!");
        }

        if(!comment) {
            throw new Error("Feedback comment is required!");
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invalid screenshot format");
        }

        await this.feedbacksrepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: 'teste',
            to: 'teste.teste@teste.com'
        });
    }
}