class BaseRepository {
    constructor(model) {
        this.model = model
    }

    async findBy({ column, value }) {
        const where = {}
        where[column] = value
        const record = await this.model.findOne({
            where
        })
        return record
    }

    async getAll() {

    }

    async create() {

    }

    async update() {

    }

    async destroy() {

    }
}

module.exports = BaseRepository