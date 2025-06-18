const InvalidCredentialException = require('../../exceptions/invalid-credential-exception')
const UserRepository = require('../../repositories/user-repository')
const AuthService = require('../../services/auth-service')

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await userRepository.findByEmail(email)

        if (!AuthService.isPasswordMatch(password, user.password))
            throw new InvalidCredentialException()
        
        const payload = {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, }
        const tokens = await AuthService.generateTokens(payload)

        res.send({ user, ...tokens })
    }

    async register(req, res) {
        const { firstName, lastName, email, password } = req.body
        const data = { firstName, lastName, email, password }
        
        const user = await UserRepository.create(data)
        const tokens = await AuthService.generateTokens(data)
        
        res.send({ user, ...tokens })
    }
}

module.exports = new AuthController()
