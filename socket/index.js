const ws = require('ws')
const Tokenizer = require('../app/modules/tokenizer')

const sockets = []

class WebSocket {
    constructor(server) {
        this.server = server
        this.ws = new ws.Server({ 'noServer': true })

        this._handleUpgrade()
    }

    _handleUpgrade() {
        this.server.on('upgrade', (request, socket, head) => {
            const id = Tokenizer.generateRandomToken()

            this.ws.handleUpgrade(request, socket, head, (socket) => {
                socket.id = id
                sockets.push(socket)

                this.ws.emit('connection', socket)
            })

        })
    }

    startListening() {
        this.ws.on('connection', (socket) => {
            socket.on('message', (message) => {
                for (const socket of sockets) {
                    socket.send(message)
                }
            })
        })
    }
}

module.exports = WebSocket