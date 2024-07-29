const Joi = require('joi');

// Define the schema for validation
const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{8,30}$')).required(),
    preferences: Joi.array().items(Joi.string()).optional()
});

const logInSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const preferenceUpdateSchema = Joi.object({
    preferences: Joi.array()
        .items(Joi.string())
        .unique()
        .required()
});

module.exports = {
    signUpSchema,
    logInSchema,
    preferenceUpdateSchema
}