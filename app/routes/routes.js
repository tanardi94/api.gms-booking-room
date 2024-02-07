const express = require('express')
const auth = require('../controllers/auth.controller')
const tokens = require('../controllers/refreshToken.controller')
const { checkHeaders } = require('../middlewares/headerVerifier')

const router = express.Router()

router.get('/profile', checkHeaders, auth.Profile)
router.post('/register', auth.Register)
router.post('/login', auth.Login)
router.post('/token', tokens.refreshToken)
router.delete('/logout', auth.Logout)

module.exports = router