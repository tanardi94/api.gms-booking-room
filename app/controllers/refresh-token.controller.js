const Client = require('../models/client.model')
const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

const refreshToken = async (req, res) => {
    try {
        let refreshToken = req.cookies.refreshToken
        if (!refreshToken) return response.unauthenticated(res)
        let client = await Client.findAll({
            where: {
                refreshToken: refreshToken
            }
        })
        if (!client[0]) return response.unauthenticated(res)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return response.unauthenticated(res)
            let clientID = client[0].id
            let clientUUID = client[0].uuid
            let clientEmail = client[0].email
            let clientUserName = client[0].username
            let accessToken = jwt.sign({clientID, clientUUID, clientUserName, clientEmail}, process.env.ACCESS_TOKEN_SECRET, {
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