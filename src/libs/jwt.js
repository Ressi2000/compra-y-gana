import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

// Generar un token JWT para el nuevo usuario
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1h", // Establece el tiempo de expiración del token (por ejemplo, 1 hora)
            },
            (err, token) => {
                if (err) {
                    console.error(err);
                    reject(err); // Rechaza la promesa en caso de error
                } else {
                    resolve(token); // Resuelve la promesa con el token generado
                }
            }
        );
    });
}
