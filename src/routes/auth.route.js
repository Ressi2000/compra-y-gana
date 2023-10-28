import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registroUsuarioSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router()

router.post('/admin/register', validateSchema(registroUsuarioSchema), register)
router.post('/admin/login', validateSchema(loginSchema), login)
router.post('/admin/logout', logout)
router.get('/admin/verify', verifyToken)
router.get('/admin/profile', authRequired, profile)

export default router;