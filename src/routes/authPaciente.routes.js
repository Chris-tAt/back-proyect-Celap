import {Router} from 'express'
import {register, login, logout, profile, verifyToken} from '../controllers/authPaciente.controllers.js'
import { authRequire } from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router()

router.post('/registerPaciente', validateSchema(registerSchema), register)
router.post('/loginPaciente', validateSchema(loginSchema), login)
router.post('/logoutPaciente', logout)
router.get('/profilePaciente', authRequire, profile)
router.get("/verifyPaciente", verifyToken)

export default router