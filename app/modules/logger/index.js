const { stack } = require('sequelize/lib/utils')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const { format } = winston
const { combine, timestamp, prettyPrint, errors } = format

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

module.exports = logger