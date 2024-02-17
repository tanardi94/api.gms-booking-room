import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()

const MYGMS_API_URL = process.env.MYGMS_API_URL

export async function GMSGetPeopleByAuthCode(authCode) {

    try {
        let gmsAPI = axios.post(`${MYGMS_API_URL}/v1/people`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + authCode 
            }
        })
        return gmsAPI.data
    } catch (error) {
        console.log(error)
        return false
    }
}