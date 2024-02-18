import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()

const MYGMS_API_URL = process.env.MYGMS_API_URL

export async function GMSGetPeopleByAuthCode(authCode) {

    try {
        let gmsAPI = await axios.get(`${MYGMS_API_URL}/v2/me`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authCode 
            }
        })

        return gmsAPI.data.result
    } catch (error) {
        console.log(error)
        return false
    }
}