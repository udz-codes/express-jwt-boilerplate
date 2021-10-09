const Joi = require('@hapi/joi')

const registerValidation = (data) => {
    const schema = Joi.object({
        
        email: Joi.string()
            .email()
            .required(),
    
        name: Joi.string()
            .min(3)
            .required(),
        
        password: Joi.string()
            .min(8)
            .required(),
        
        date: Joi.date()
            .default(Date.now),

        // Update further is any fields added to UserModel.js
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        
        password: Joi.string()
            .min(8)
            .required(),
    })

    return schema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation