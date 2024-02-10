const { verify } = require('jsonwebtoken')
const response = require('../helpers/response')

const verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null ) return response.unauthenticated(res)
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return response.forbidden(res)
        req.email = decoded.userEmail
        req.uuid = decoded.userUUID
        next()
    })
}

module.exports = {
    verifyToken
}