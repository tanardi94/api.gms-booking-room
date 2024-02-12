const { verify } = require('jsonwebtoken')
const response = require('../helpers/response')

const verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    if (token == null ) return response.unauthenticated(res)
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.forbidden(res)
        req.user = user
        next()
    })
}

module.exports = {
    verifyToken
}