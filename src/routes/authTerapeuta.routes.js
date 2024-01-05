import {Router} from 'express'
import {register, login, logout, updateTerapeuta, profile, verifyToken} from '../controllers/authTerapeuta.controller.js'
import { authRequire } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router()

router.post('/registerTerapeuta', validateSchema(registerSchema), register)
router.post('/loginTerapeuta', validateSchema(loginSchema), login)
router.post('/logoutTerapeuta', logout)
router.put('/updateTerapeuta/:id', authRequire, updateTerapeuta)
router.get('/profileTerapeuta', authRequire, profile)
router.get("/verifyTerapeuta", verifyToken)

export default router