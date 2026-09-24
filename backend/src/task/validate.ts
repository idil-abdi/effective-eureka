import Joi from "joi"
import { Frequency } from "../generated/prisma/enums"

export const createTaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    frequency: Joi.string().valid(...Object.values(Frequency)).required(),
    dueDay:  Joi.alternatives().conditional('frequency', {
        switch: [
            {
                is:'DAILY',
                then: Joi.forbidden
            },
            {
                is:'WEEKLY',
                then: Joi.string().valid("MONDAY", 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY').required()
            },
            {
                is:'MONTHLY',
                then: Joi.string().custom((value, helpers) => {
                    const num = parseInt(value, 10);
                    if (isNaN(num) || num < 1 || num> 31) {
                        return helpers.error('any.invalid');
                    }
                    return value;
                }, 'Monthly Day Validation').required()
            },
        ],
        otherwise: Joi.forbidden()
    }),
})