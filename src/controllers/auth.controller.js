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