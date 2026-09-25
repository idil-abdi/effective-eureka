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

export const updateTaskSchema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    frequency: Joi.string().valid(...Object.values(Frequency)).optional(),
    dueDay: Joi.alternatives().conditional('frequency', {
        switch: [
            {
                is: 'DAILY',
                then: Joi.forbidden()
            },
            {
                is: 'WEEKLY',
                then: Joi.string().valid("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY").optional()
            },
            {
                is: 'MONTHLY',
                then: Joi.string().custom((value, helpers) => {
                    const num = parseInt(value, 10);
                    if (isNaN(num) || num < 1 || num > 31) {
                        return helpers.error('any.invalid');
                    }
                    return value;
                }, 'Monthly Day Validation').optional()
            },
        ],
        otherwise: Joi.optional() // Allows dueDay to be omitted if frequency isn't being changed
    }),
}).min(1); // Requires at least one field to be present in the update payload