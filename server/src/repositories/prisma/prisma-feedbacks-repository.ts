import { FeedbackCreateData, FeedbacksReposirtory } from "../feedbacks-repository";
import { prisma } from '../../prisma';

export class PrismaFeedbacksRepository implements FeedbacksReposirtory {
    async create({type, comment, screenshot}: FeedbackCreateData): Promise<void> {
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        });
    }
}