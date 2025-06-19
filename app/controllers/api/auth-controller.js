const InvalidCredentialException = require('../../exceptions/invalid-credential-exception')
const UserRepository = require('../../repositories/user-repository')
const AuthService = require('../../services/auth-service')

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await UserRepository.findByEmail(email)

        if (!AuthService.isPasswordMatch(password, user.password))
            throw new InvalidCredentialException()
        
        const payload = {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, }
        const tokens = await AuthService.generateTokens(payload)

        res.send(this._parsedResponse(user, tokens))
    }

    async register(req, res) {
        const { firstName, lastName, email, password } = req.body
        const data = { firstName, lastName, email, password }
        
        const user = await UserRepository.create(data)
        const tokens = await AuthService.generateTokens(data)
        
        res.send(this._parsedResponse(user, tokens))
    }

    _parsedResponse = (user, tokens ) => {
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            },
            ...tokens
        }
    }
}


module.exports = new AuthController()
