import * as response from '../helpers/response.js'
import dotenv from 'dotenv'
dotenv.config()

export const checkHeaders = (req, res, next) => {

    let apiKey = req.headers['x-api-key']
    if (apiKey != process.env.CLIENT_API_KEY) return response.forbidden(res)

    next()
}