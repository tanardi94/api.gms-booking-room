import winston from 'winston';
import dotenv from "dotenv"
dotenv.config()

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-')
}

const requestLoggerTransports = [
    new winston.transports.File({
        level: 'warn',
        filename: `${process.env.LOG_DIRECTORY}/${formatDate(Date.now())}/warning.log`
    }),

    new winston.transports.File({
        level: 'error',
        filename: `${process.env.LOG_DIRECTORY}/${formatDate(Date.now())}/error.log`,
        handleExceptions: true,
        colorize: false
    })
]

if (process.env.NODE_ENV !== 'production') {
    requestLoggerTransports.push(
        new winston.transports.Console()
    )
}

// const logger = winston.createLogger({
//     transports: loggerTransports,
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json(),
//         winston.format.prettyPrint()
//     )
// })

const requestLogger = winston.createLogger({
    transports: requestLoggerTransports,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    )
})

export default requestLogger