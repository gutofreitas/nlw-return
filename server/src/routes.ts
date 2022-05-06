import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();


routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;

    const prismaFeedbackRepository = new PrismaFeedbacksRepository();
    const nodemailerAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository,nodemailerAdapter);
    await submitFeedbackUseCase.handle({
        type,
        comment,
        screenshot
    });

    return res.status(201);
});