const express = require('express')
const http = require('http')
const Router = require('../router')
const Scheduler = require('../app/scheduler')
const WebSocket = require('../socket')

class Server {
    constructor(port) {
        this.app = express()
        this.port = port
        this.router = Router
        this.server = http.createServer(this.app)
    }

    start() {
        this._setupRoutes()
        this._listen()
        this._startScheduler()
        this._openWebSocket()
    }

    _openWebSocket() {
        const ws = new WebSocket(this.server)
        ws.startListening()
    }

    _startScheduler() {
        Scheduler.runTasks()
    }

    _setupRoutes() {
        this.router.create(this.app)
    }

    _listen() {
        this.server.listen(this.port, () => {
            console.log(`App is running in port ${this.port}`)
        })
    }
}

module.exports = Server