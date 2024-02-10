const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')


var result = {
    code: 200,
    data: null,
    message: null
}

const loginService = async (params) => {

    let user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'password'],
        where: {
            email: params.email
        }
    })
    
    let match = await bcrypt.compare(params.password, user.password)
    if (!match) {
        throw new Error("Wrong")
    }
    
    let userUUID = user.uuid
    let userID = user.id
    let userEmail = user.email

    

    let accessToken = jwt.sign({userUUID, userEmail, userID}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20m'
    })

    let refresher = jwt.sign({userUUID, userEmail, userID}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '20w'
    })

        
    
    await User.update({
        refreshToken: refresher
    },
    {
        where: {
            uuid: userUUID
        }
    })

    result.data = {
        refresher: refresher,
        accessToken: accessToken
    }

    return result
}

const registerService = async (params) => {

    let { name, email, password, confPassword, username } = params

    if (password !== confPassword) {
        result.code = 400
        result.message = "Password does not match"
        return result
    }
    let salt = await bcrypt.genSalt()
    let hashedPassword = await bcrypt.hash(password, salt)

    await User.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword
    })

    result.message = "user Created"
    return result
}

const getProfileService = async (params) => {

    let user = await User.findOne({
        attributes: ['uuid', 'name', 'email'],
        where: {
            uuid: params.uuid
        }
    })

    if (!user) {
        result.code = 404
        return result
    }

    result.code = 200
    result.data = user

    return result
}

const logoutService = async (params) => {

    let refreshToken = params
    if (!refreshToken) return response.notFound('user', res)
    let user = await User.findOne({
        where: {
            refreshToken: refreshToken
        }
    })
    if (!user) {
        result.code = 404
        result.message = "user"
        return result 
    }

    let userID = user.uuid
    await User.update({refresh_token: null}, {
        where: {
            uuid: userID
        }
    })
    
    result.message = "Successfully logged out"
    return result
    
}

module.exports = {
    getProfileService, logoutService, loginService, registerService
}