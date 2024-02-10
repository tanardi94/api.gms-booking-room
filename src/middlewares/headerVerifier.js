const response = require('../helpers/response')

const checkHeaders = (req, res, next) => {
    

    let apiKey = req.headers['x-api-key']

    // let secretKey = req.headers['x-secret-key']

    if (apiKey != process.env.CLIENT_API_KEY) return response.forbidden(res)

    // if (secretKey == null) return response.forbidden(res)

    // let credentials = req.headers['x-secret-key'].split('_')

    // req.clientUUID = credentials[1]
    // req.clientUsername = credentials[0]

    next()
}

module.exports = {
    checkHeaders
}