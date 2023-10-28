import app from './app.js';
import { connectDB } from './db.js';
import { config } from 'dotenv';

config(); // Esto carga las variables de entorno de tu archivo .env
connectDB();
app.listen(3000, () => {
    console.log('Aplicación escuchando en el puerto 3000');
});