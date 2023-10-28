import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { viewCrm } from "../controllers/crm.controller.js";

const router = Router();
  
router.get('/admin/crm', authRequired, viewCrm );

export default router;