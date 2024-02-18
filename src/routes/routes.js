import { Router } from 'express'
import * as response from '../helpers/response.js'
import { doProfile, doLogin } from '../controllers/auth.controller.js'
import { checkHeaders } from '../middlewares/headerVerifier.js'
import { verifyToken } from '../middlewares/tokenVerifier.js'

const router = Router()

router.get("/", (req, res) => {
    return response.ok("Hello WOrld", res);
})

router.get('/profile', [checkHeaders, verifyToken], doProfile)
router.post('/login', doLogin)

export default router