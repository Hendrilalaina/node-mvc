class BaseTask {
    async handle() {
        this.info("Empty tasks!")
    }

    info(message) {
        console.log(message)
    }

    saveLog(message) {

    }
}

module.exports = BaseTask