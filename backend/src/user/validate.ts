import Joi from "joi";

export const createUserSchema = Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().email().max(100).required(),
    password: Joi.string().trim().required(),
});