const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()
const app = express()
const port = process.env.APP_PORT
const db = require('./config/database')
const cookieParser = require('cookie-parser')
const expressWinston = require('express-winston')
const { requestLogger } = require('./config/logging')

try {
    db.authenticate()
    console.log('Database connected...')
} catch (error) {
    console.error(error)
}

app.get('/', (req, res) => res.send('Hello World!'))

const apiRoutes = require('./src/routes/routes')

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true
}))
app.use('/api', apiRoutes)
app.listen(port, () => console.log(`${process.env.APP_NAME} is running on port ${port}!`))