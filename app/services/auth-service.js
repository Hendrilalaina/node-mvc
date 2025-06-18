const bcrypt = require('bcrypt')
const { appKey, tokenExpiresIn } = require('../../config/app')
const Tokenizer = require('../modules/tokenizer')

class AuthService {
    async isPasswordMatch(attempted, original) {
        return await bcrypt.compare(attempted, original)
    }

    async generateTokens(payload) {
        return {
            accessToken: Tokenizer.generateAccessToken(payload),
            refreshToken: Tokenizer.generateRefreshToken()
        }
    }

}

module.exports = new AuthService()