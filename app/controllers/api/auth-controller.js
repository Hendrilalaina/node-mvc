const { User } = require('../../../models')

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user)
            return res.status(403).send("Invalid credentials")
        if (password !== user.password)
            return res.status(403).send("Invalid credentials")

        res.send(user)
    }

    async register(req, res) {
        res.send("Register")
    }
}

module.exports = new AuthController()
