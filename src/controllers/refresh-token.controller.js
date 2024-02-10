const User = require('../models/user')
const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

const refreshToken = async (req, res) => {
    try {
        let refreshToken = req.cookies.refreshToken
        if (!refreshToken) return response.unauthenticated(res)
        let user = await User.findAll({
            where: {
                refreshToken: refreshToken
            }
        })
        if (!user[0]) return response.unauthenticated(res)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return response.unauthenticated(res)
            let userID = user[0].id
            let userUUID = user[0].uuid
            let userEmail = user[0].email
            let userUserName = user[0].username
            let accessToken = jwt.sign({userID, userUUID, userUserName, userEmail}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20m'
            })
            return response.ok(refreshToken, res)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    refreshToken
}