const { signUpSchema, logInSchema, preferenceUpdateSchema } = require('./schemaValidators');
const AppException = require('./AppExceptions');

// Validation middleware function
const validateSignup = (req, res, next) => {
    const { error } = signUpSchema.validate(req.body);

    if (error) {
        next(new AppException(400, error.details[0].message));
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { error } = logInSchema.validate(req.body);

    if (error) {
        next(new AppException(400, error.details[0].message));
    }

    next();
};

const validatePreferenceUpdateSchema = (req, res, next) => {
    const { error } = preferenceUpdateSchema.validate(req.body);

    if (error) {
        next(new AppException(400, error.details[0].message));
    }

    next();
}

module.exports = { validateSignup, validateLogin, validatePreferenceUpdateSchema };
