import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express()
const port = process.env.APP_PORT
import db from './config/database.js'
import cookieParser from 'cookie-parser'

try {
    db.authenticate()
    console.log('Database connected...')
} catch (error) {
    console.error(error)
}

app.get('/', (req, res) => res.send('Hello World!'))

import apiRoutes from './src/routes/routes.js'

app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', apiRoutes)
app.listen(port, () => console.log(`${process.env.APP_NAME} is running on port ${port}!`))