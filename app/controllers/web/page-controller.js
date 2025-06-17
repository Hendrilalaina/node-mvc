class PageController {
    home(req, res) {
        res.send("Home page controller.")
    }

    about(req, res) {
        res.send("About page controller")
    }

    contact(req, res) {
        res.send("Contact page controller.")
    }
}

module.exports = new PageController()