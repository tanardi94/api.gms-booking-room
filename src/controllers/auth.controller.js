import * as response from '../helpers/response.js'
import * as authService from '../services/auth.service.js'
import { ErrorMessage, ErrorLoginMessage } from '../../config/messageResponse.js'

export const ErrHandling = (error, res) => {
    console.error(error)
    return response.failure(
        ErrorMessage, res
    )
}

export const LoginHandling = (error, res) => {
    console.log(error)
    return response.failure(ErrorLoginMessage, res)
}

export const doAPI = async (req, res) => {
    let params = req.body
    try {
        let authorized = await authService.APIService(params)
        return response.ok(authorized, res)
    } catch (error) {
        console.log(error)
        return response.failure(error.message, res)
    }
}

export const doProfile = async (req, res) => {

    let params = req.user
    try {
        let authorized = await authService.getProfileService(params)

        if (!authorized.data) {
            return response.notFound("User", res)
        }

        return response.ok(authorized.data, res)
    } catch (error) {
        return ErrHandling(error, res)
    }
}

export const doRegister = async (req, res) => {

    try {
        let register = await authService.registerService(req.body)
        
        if (register.code !== 200) {
            return response.failure(register.message, res)
        }

        return response.customResponse(register.message, true, 200, [], [], res)
    } catch (error) {
        return ErrHandling(error, res)
    }
    
}

export const doLogin = async (req, res) => {

    let params = req.body
    try {

        let user = await authService.loginService(params)

        return response.ok({
            accessToken: user.data.accessToken
        }, res)
        
    } catch (error) {
        return LoginHandling(error, res)
    }
}

export const doLogout = async (req, res) => {

    try {
        let logout = await authService.logoutService(req.cookies.refreshToken)

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