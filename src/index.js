// index.js
import { config } from 'dotenv';
config();

import app from './app.js';
import { connectDB } from './db.js';

connectDB();
app.listen(3000, () => {
    console.log('Aplicación escuchando en el puerto 3000');
});
