const { default: axios } = require("axios")

const MYGMS_API_URL = process.env.MYGMS_API_URL
const MYGMS_CLIENT_ID = process.env.MYGMS_CLIENT_ID
const MYGMS_CLIENT_SECRET = process.env.MYGMS_CLIENT_SECRET

exports.GMSGetPeopleByAuthCode = async (req, res) => {
    try {
        let gmsAPI = axios.post(MYGMS_API_URL + '/oauth/token', {
            client_id: MYGMS_CLIENT_ID,
            client_secret: MYGMS_CLIENT_SECRET,
            auth_code: req.body.authCode
        })

        res.json(gmsAPI)
    } catch (error) {
        console.log(error)
        return
    }
}