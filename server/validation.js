// Validation
const Joi = require('joi');

// Register validation
const registerValidation = (data) => {
    const validation_schema = Joi.object({
        status: Joi.number().required(),
        fnavn: Joi.string().alphanum().required(),
        enavn: Joi.string().alphanum().required(),
        telefon: Joi.string().alphanum().required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        pwd: Joi.string().required()
    });

    // Data validation before we continue creating the user
    return validation_schema.validate(data);
}

// Login validation
const loginValidation = (data) => {
    const validation_schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        pwd: Joi.string().required(),
        remember: Joi.boolean().required()
    });

    // Data validation before we allow the user to login
    return validation_schema.validate(data);
}

// Email validation 
const emailValidation = (data) => {
    const validation_schema = Joi.object({
        epost: Joi.string().email({ minDomainSegments: 2 }).required()
    });

    // Return the result of the validation
    return validation_schema.validate(data);
}

// Hex validation
const hexValidation = (data) => {
    const validation_schema = Joi.object({
        token: Joi.string().length(40).hex()
    });

    // Return the result of the validation
    return validation_schema.validate(data);
}

// Password validation
const pwValidation = (data) => {
    const validation_schema = Joi.object({
        password: Joi.string().required(),
        password2: Joi.string().required()
    });

    // Return the result of the validation
    return validation_schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.emailValidation = emailValidation;
module.exports.hexValidation = hexValidation;
module.exports.pwValidation = pwValidation;