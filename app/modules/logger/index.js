const { stack } = require('sequelize/lib/utils')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const { format } = winston
const { combine, timestamp, prettyPrint, errors } = format

const fs = require('fs')
const util = require('util')
const path = require('path')
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const transport = new DailyRotateFile({
    datePattern: 'YYYY-MM-DD',
    dirname: 'logs'
})

const logger = winston.createLogger({
    format: combine(
        errors({stack: true}),
        timestamp(),
        prettyPrint(),
        format.json()
    ),
    json: true,
    transports: [
        transport
    ]
})

logger.getLogDates = async () => {
    const destination = path.join(__dirname, '../../../logs')
    const files = await readdir(destination, { withFileTypes: true })

    console.log(files)

    return files
        .filter(file => !file.isDirectory() && file.name !== '.gitignore') 
        .map(file => file.split('.')[2])
}

logger.getLogByDate = async (date) => {
    {}
}

module.exports = logger