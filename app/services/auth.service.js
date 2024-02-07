const bcrypt = require('bcrypt')
const Client = require('../models/client.model')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')


var result = {
    code: 200,
    data: null,
    message: null
}

const doLogin = async (params) => {

    let client = await Client.findOne({
        attributes: ['uuid', 'name', 'username', 'email', 'password'],
        where: {
            email: params.email
        }
    })
    
    let match = await bcrypt.compare(params.password, client.password)
    if (!match) {
        throw new Error("Wrong")
    }
    
    let clientUUID = client.uuid
    let clientID = client.id
    let clientEmail = client.email
    let clientUserName = client.username

    

    let accessToken = jwt.sign({clientUUID, clientUserName, clientEmail, clientID}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20m'
    })

    let refresher = jwt.sign({clientUUID, clientUserName, clientEmail, clientID}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '20w'
    })

        
    
    await Client.update({
        refreshToken: refresher
    },
    {
        where: {
            uuid: clientUUID
        }
    })

    result.data = {
        refresher: refresher,
        accessToken: accessToken
    }

    return result
}

const doRegister = async (params) => {

    let { name, email, password, confPassword, username } = params

    if (password !== confPassword) {
        result.code = 400
        result.message = "Password does not match"
        return result
    }
    let salt = await bcrypt.genSalt()
    let hashedPassword = await bcrypt.hash(password, salt)

    Client.create({
        name: name,
        uuid: uuid.v4(),
        username: username,
        email: email,
        password: hashedPassword
    })

    result.message = "Client Created"
    return result
}

const getProfile = async (params) => {

    let client = await Client.findOne({
        attributes: ['uuid', 'name', 'username', 'email'],
        where: {
            uuid: params.uuid
        }
    })

    if (!client) {
        result.code = 404
        return result
    }

    result.code = 200
    result.data = client

    return result
}

const doLogout = async (params) => {

    let refreshToken = params
    if (!refreshToken) return response.notFound('Client', res)
    let client = await Client.findOne({
        where: {
            refreshToken: refreshToken
        }
    })
    if (!client) {
    result.code = 404
    result.message = "Client"
    return result 
    }

    let clientID = client.uuid
    await Client.update({refresh_token: null}, {
        where: {
            uuid: clientID
        }
    })
    
    result.message = "Successfully logged out"
    return result
    
}

module.exports = {
    getProfile, doLogin, doRegister, doLogout
}