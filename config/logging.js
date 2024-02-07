const winston = require('winston')

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('')
}

const loggerTransports = [
    new winston.transports.File({
        level: 'info',
        filename: `${process.env.LOG_DIRECTORY}/${formatDate(Date.now())}/info.log`,
        handleExceptions: true,
        colorize: false
    })
]

const requestLoggerTransports = [
    new winston.transports.File({
        level: 'warn',
        filename: `${process.env.LOG_DIRECTORY}/${formatDate(Date.now())}/warning.log`
    }),

    new winston.transports.File({
        level: 'error',
        filename: `${process.env.LOG_DIRECTORY}/${formatDate(Date.now())}/error.log`
    })
]

if (process.env.NODE_ENV !== 'production') {
    loggerTransports.push(
        new winston.transports.Console()
    )
}

const logger = winston.createLogger({
    transports: loggerTransports,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    )
})

const requestLogger = winston.createLogger({
    transports: requestLoggerTransports,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    )
})

module.exports = {
    logger, requestLogger
}