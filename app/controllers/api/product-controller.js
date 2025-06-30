class ProductController {
    async index(req, res) {
        return res.send("Product index.")
    }

    async create(req, res) {
        console.log(req.body)
        res.send("It works!")
    }
}

module.exports = new ProductController()