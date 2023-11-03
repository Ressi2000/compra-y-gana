import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from "path";
import { config } from 'dotenv';


const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta del archivo actual
const __dirname = path.dirname(__filename); // Calcula el directorio actual (__dirname)

// Importamos las rutas de los controladores
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/tasks.route.js"
import formRoutes from "./routes/formulario.route.js"
import dolarRoutes from "./routes/dolar.route.js"
import storeRoutes from "./routes/store.route.js"
import crmRoutes from "./routes/crm.route.js"



//Inicializando express
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(config()); // Esto carga las variables de entorno de tu archivo .env)

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use(authRoutes);
app.use(taskRoutes);
app.use(formRoutes);
app.use(dolarRoutes);
app.use(storeRoutes);
app.use(crmRoutes);

// Configura una ruta estática para servir archivos desde la carpeta "uploads"
app.use('/public', express.static(`${__dirname}/uploads`));

export default app;