class AuthController {
    async login(req, res) {
        res.send("Login")
    }

    async register(req, res) {
        res.send("Register")
    }
}

module.exports = new AuthController()
