import { Router } from "express";
import { getDolar } from "../controllers/dolar.controller.js";

const router = Router();

router.get('/admin/api-dolar-bcv', getDolar);

export default router;