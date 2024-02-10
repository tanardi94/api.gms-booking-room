const response = require('../helpers/response')
const userService = require('../services/auth.service')
const Message = require('../../config/messageResponse')

const ErrHandling = (error, res) => {
    console.error(error)
    return response.failure(
        Message.ErrorMessage, res
    )
}

const LoginHandling = (error, res) => {
    console.log(error)
    return response.failure(Message.ErrorLoginMessage, res)
}

const doProfile = async (req, res) => {

    let params = {
        uuid:req.uuid
    }
    try {
        let authorized = await userService.getProfileService(params)

        if (!authorized.data) {
            return response.notFound("User", res)
        }

        return response.ok(authorized.data, res)
    } catch (error) {
        return ErrHandling(error, res)
    }
}

const doRegister = async (req, res) => {

    try {
        let register = await userService.registerService(req.body)
        
        if (register.code !== 200) {
            return response.failure(register.message, res)
        }

        return response.customResponse(register.message, true, 200, [], [], res)
    } catch (error) {
        return ErrHandling(error, res)
    }
    
}

const doLogin = async (req, res) => {

    let params = req.body
    try {

        let client = await userService.loginService(params)

        res.cookie('refreshToken', client.data.refresher, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return response.ok({
            accessToken: client.data.accessToken
        }, res)
        
    } catch (error) {
        return LoginHandling(error, res)
    }
}

const doLogout = async (req, res) => {

    try {
        let logout = await userService.logoutService(req.cookies.refreshToken)

        switch (logout.code) {
            case 404:
                return response.notFound(logout.message, res)
                break;
        
            default:
                res.clearCookie('refreshToken')
                return response.customResponse(logout.message, true, 200, [], [], res)
                break;
        }

    } catch (error) {
        return ErrHandling(error, res)
    }
}

module.exports = {
    doProfile, doRegister, doLogin, doLogout
}