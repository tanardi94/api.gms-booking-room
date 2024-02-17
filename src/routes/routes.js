import { Router } from 'express'
import * as response from '../helpers/response.js'
import { doProfile, doRegister, doLogin, doAPI, doLogout } from '../controllers/auth.controller.js'
import { checkHeaders } from '../middlewares/headerVerifier.js'
import { verifyToken } from '../middlewares/tokenVerifier.js'

const router = Router()

router.get("/coba", (req, res) => {
    return response.ok("Hello WOrld", res);
})

router.get('/profile', [checkHeaders, verifyToken], doProfile)
router.post('/register', doRegister)
router.post('/login', doLogin)
router.post('/coba', doAPI)
router.delete('/logout', doLogout)

export default router