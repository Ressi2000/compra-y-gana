import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta del archivo actual
const __dirname = path.dirname(__filename); // Calcula el directorio actual (__dirname)

// Define el almacenamiento de archivos usando Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(__dirname, '..', 'uploads'); // Ruta absoluta al directorio "uploads"
        //console.log("Multer: Configuración de destino", uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        //console.log("Multer: Configuración de nombre de archivo");
        // Genera un nombre de archivo único
        cb(null, Date.now() + "-" + file.originalname);
    },
});


// Configura Multer
// console.log("Multer: Configuración completa");
export const upload = multer({ storage: storage });
