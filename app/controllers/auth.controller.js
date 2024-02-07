const response = require('../helpers/response')
const clientService = require('../services/auth.service')
const Message = require('../../config/messageResponse')

const ErrHandling = (error, res) => {
    console.log(error)
    return response.failure(
        Message.ErrorMessage, res
    )
}

const LoginHandling = (error, res) => {
    console.log(error)
    return response.failure(Message.ErrorLoginMessage, res)
}

const Profile = async (req, res) => {


    let params = {
        uuid:req.clientUUID
    }
    try {
        let authorized = await clientService.getProfile(params)

        return response.ok(authorized.data, res)
    } catch (error) {
        return ErrHandling(error, res)
    }
}

const Register = async (req, res) => {

    try {
        let register = await clientService.doRegister(req.body)
        
        if (register.code !== 200) {
            return response.failure(register.message, res)
        }

        return response.customResponse(register.message, true, 200, [], [], res)
    } catch (error) {
        return ErrHandling(error, res)
    }
    
}

const Login = async (req, res) => {

    let params = req.body
    try {

        let client = await clientService.doLogin(params)

        res.cookie('refreshToken', client.data.refresher, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return response.ok(client.data.accessToken, res)
        
    } catch (error) {
        return LoginHandling(error, res)
    }
}

const Logout = async (req, res) => {

    try {
        let logout = await clientService.doLogout(req.cookies.refreshToken)

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
    Profile, Register, Login, Logout
}