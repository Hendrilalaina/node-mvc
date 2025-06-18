const { body } = require('express-validator')

module.exports = (() => {
    return [
        body('email')
            .isEmail()
            .withMessage("Email needs to be valid!"),
        
        body('password')
            .notEmpty()
            .withMessage("Password cannot be empty!")
    ]
})()