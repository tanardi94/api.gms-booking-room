const express = require('express')
const response = require('../helpers/response')
const authController = require('../controllers/auth.controller')
// const tokens = require('../controllers/refreshToken.controller')
const { checkHeaders } = require('../middlewares/headerVerifier')
const { verifyToken } = require('../middlewares/tokenVerifier')

const router = express.Router()

router.get("/coba", (req, res) => {
    return response.ok("Hello WOrld", res);
})

router.get('/profile', [checkHeaders, verifyToken], authController.doProfile)
router.post('/register', authController.doRegister)
router.post('/login', authController.doLogin)
// router.post('/token', tokens.refreshToken)
// router.delete('/logout', auth.Logout)

module.exports = router