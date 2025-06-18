const BaseException = require('./base-exception')

class ModelNotFoundException extends BaseException {
    constructor(model) {
        super(`Requested ${model} not found`, 404)
    }
}

module.exports = ModelNotFoundException