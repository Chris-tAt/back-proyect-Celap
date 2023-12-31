import {Router} from 'express'
import {register, login, logout, profile, verifyToken} from '../controllers/auth.controller.js'
// import { authRequire } from '../middlewares/validateToken.js'
// import {validateSchema} from '../middlewares/validator.middlewares.js'
// import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
// router.post('/logout', logout)
// router.get('/profile', authRequire, profile)
// router.get("/verify", verifyToken)

export default router