const express = require('express')
const webRoutes = require('./web')
const { routes } = require('./web/pages')

class Router {
    constructor() {
        this.router = express.Router()
        this.webRoutes = webRoutes
    }

    create(app) {
        // TODO attach middleware

        // TODO attach routes
        this._attachWebRoutes()

        // TODO handle 404 pages
        this._handlePageNotFound()

        // TODO handle exceptions

        // TODO register router 

        app.use(this.router)
    }

    _handlePageNotFound() {
        this.router.all('*', (req, res) => {
            res.status(404).send("Error 404. Page not found")
        })
    }

    _attachWebRoutes() {
        this._attachRoutes(this.webRoutes)
    }

    _attachApiRoutes() {

    }

    _attachRoutes(routeGroups, prefix = '') {
        routeGroups.forEach(({ group, routes }) => {
            routes.forEach(({ method, path, handler }) => {
                this.router[method](prefix + group.prefix + path, handler)
            })
        });

    }
}

module.exports = new Router()