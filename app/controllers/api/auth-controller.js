const { User } = require('../../../models')
const InvalidCredentialException = require('../../exceptions/invalid-credential-exception')

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user)
            throw new InvalidCredentialException()
        if (password !== user.password)
            throw new InvalidCredentialException()
        res.send(user)
    }

    async register(req, res) {
        res.send("Register")
    }
}

module.exports = new AuthController()
