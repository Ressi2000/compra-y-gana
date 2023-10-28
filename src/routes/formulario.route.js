import { upload } from "../libs/multer.js"; // Importa el middleware de Multer
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { sendForm, viewForms, storeForms } from "../controllers/formulario.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { formularioSchema } from "../schemas/formulario.schema.js";

const router = Router();

router.post('/formulario', upload.single("fotoFactura"), (req, res, next) => {
    //console.log(req.file); // Imprime el objeto del archivo subido
    next();
  }, validateSchema(formularioSchema), sendForm);
  
router.get('/admin/formulario', authRequired, viewForms );

router.get('/stores', storeForms);

export default router;