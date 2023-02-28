import { z } from 'zod';
import { ValidationError } from './ValidationError';

export interface VacationModel {
    id: number;
    destination: string;
    description: string;
    userId: string;
    totalLikes: number;
    start: Date;
    end: Date;
    price: number;
    // image?: File;
    imageName: string;
}

export const vacationSchema = z.object({
    name: z.string().min(2, { message: "Name should be longer than 2 characters"}),
    price: z.number().positive({ message: "Price should be positive" })
});

export const vacationValidation = (req, res, next) => {
    const vacation = req.body;
    try {
        vacationSchema.parse(vacation);
        next()
    } catch (e) {
        next(new ValidationError(e));
    }
}