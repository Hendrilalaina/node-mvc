const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { appKey, tokenExpiresIn } = require('../../config/app')

class AuthService {
    async isPasswordMatch(attempted, original) {
        return await bcrypt.compare(attempted, original)
    }

    async generateToken(payload) {
        return jwt.sign(payload, appKey, { expiresIn: tokenExpiresIn })
    }

}

module.exports = new AuthService()