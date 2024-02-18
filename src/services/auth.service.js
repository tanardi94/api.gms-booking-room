import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { GMSGetPeopleByAuthCode } from '../helpers/gms-api.js'


var result = {
    code: 200,
    data: null,
    message: null
}

export const loginService = async (params) => {

    let GMSAccount = await GMSGetPeopleByAuthCode(params.auth_code)
    if (!GMSAccount) {
        return null
    }

    let user = await User.findOne({
        where: {
            gmsUserID: GMSAccount.mygms_id
        }
    })

    if (!user) {
        user = await User.create({
            name: GMSAccount.name,
            gmsUserID: GMSAccount.mygms_id,
            roleType: GMSAccount.type,
            nij: GMSAccount.nij
        })
    }
    
    let gmsID = user.gmsUserID
    let name = user.name
    let id = user.id
    let nij = user.nij

    

    let accessToken = jwt.sign({id, name, nij, gmsID}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20w'
    })

    result.data = {
        accessToken: accessToken,
        nij: user.nij
    }

    return result
}

export const getProfileService = async (params) => {

    if (!params) {
        result.code = 404
        return result
    }

    result.code = 200
    result.data = {
        uuid: params.gmsUserID,
        name: params.name,
        nij: params.nij
    }

    return result
}