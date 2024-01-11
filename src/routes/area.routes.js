import {Router} from 'express'
import { areaAsignada } from '../controllers/area.controller.js'
import { validateToken } from "../middlewares/index.js";

const router = Router()

router.get("/area/:asignada", [validateToken.authRequire, validateToken.areaMiddleware], areaAsignada)

export default router