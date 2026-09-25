import Joi from "joi";

export const markTaskCompletionSchema = Joi.object({
    date: Joi.date().iso().required(), // Expects an ISO date string (e.g., "2026-06-06")
          completed: Joi.boolean().required(),
})