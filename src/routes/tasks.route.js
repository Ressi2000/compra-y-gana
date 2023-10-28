import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTasks, getTask, createTask, deleteTask, updateTask } from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get('/admin/tasks', authRequired, getTasks)
router.get('/admin/tasks/:id', authRequired, getTask)
router.post('/admin/tasks', authRequired, validateSchema(createTaskSchema), createTask)
router.delete('/admin/tasks/:id', authRequired, deleteTask)
router.put('/admin/tasks/:id', authRequired, updateTask)

export default router;