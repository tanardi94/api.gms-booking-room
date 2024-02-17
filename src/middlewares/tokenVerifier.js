import jwt from 'jsonwebtoken'
import * as response from '../helpers/response.js'

export const verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null ) return response.unauthenticated(res)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.forbidden(res)
        req.user = user
        next()
    })
}