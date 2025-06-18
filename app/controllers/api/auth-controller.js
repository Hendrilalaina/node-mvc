const { User } = require('../../models')
const InvalidCredentialException = require('../../exceptions/invalid-credential-exception')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { appKey, tokenExpiresIn } = require('../../../config/app')
const userRepository = require('../../repositories/user-repository')

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await userRepository.findByEmail(email)

        if (!await bcrypt.compare(password, user.password))
            throw new InvalidCredentialException()
        
        const payload = {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, }
        const accessToken = jwt.sign(payload, appKey, {expiresIn: tokenExpiresIn})

        res.send({ user, ...{ accessToken } })
    }

    async register(req, res) {
        res.send("Register")
    }
}

module.exports = new AuthController()
