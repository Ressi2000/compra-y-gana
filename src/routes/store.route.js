import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createStore, deleteStore, getStore, getStores, updateStore } from "../controllers/store.controller.js";

const router = Router();

router.get('/admin/stores', authRequired, getStores);
router.get('/admin/stores/:id', authRequired, getStore )
router.post('/admin/stores', authRequired, createStore)
router.delete('/admin/stores/:id', authRequired, deleteStore )
router.put('/admin/stores/:id', authRequired, updateStore)

export default router;