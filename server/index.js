const express = require('express')
const Router = require('../router')

class Server {
    constructor(port) {
        this.app = express()
        this.port = port
    }

    start() {
        this._setupRoutes()
        this._listen()
    }

    _setupRoutes() {
        Router.create(this.app)
        this.app.get('/', (req, res) => {
            res.send("Home page")
        })
    }

    _listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running in port ${this.port}`)
        })
    }
}

module.exports = Server