const fs = require('fs')
const util = require('util')
const path = require('path')
const mkdir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)

const ProductRepository = require('../../repositories/product-repository')

class ProductController {
    async index(req, res) {
        return res.send("Product index.")
    }

    async create(req, res) {
        const { name } = req.body
        const files = Object.values(req.body.files)

        const product = await ProductRepository.create({
            name
        })

        const destination = `../../../public/images/products/${product.id}`

        await mkdir(path.join(__dirname, destination))

        const buffer = files[0].buffer
        const extension = 'jpg'
        const filename = `${Date.now()}.${extension}`

        await writeFile(path.join(__dirname, destination, filename), buffer)

        res.send(product)
    }
}

module.exports = new ProductController()