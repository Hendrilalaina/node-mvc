const { User } = require('../../models')
const InvalidCredentialException = require('../../exceptions/invalid-credential-exception')
const { appKey, tokenExpiresIn } = require('../../../config/app')
const userRepository = require('../../repositories/user-repository')
const AuthService = require('../../services/auth-service')

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await userRepository.findByEmail(email)

        if (!AuthService.isPasswordMatch(password, user.password))
            throw new InvalidCredentialException()
        
        const payload = {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, }
        const accessToken = await AuthService.generateToken(payload)

        res.send({ user, ...{ accessToken } })
    }

    async register(req, res) {
        res.send("Register")
    }
}

module.exports = new AuthController()
