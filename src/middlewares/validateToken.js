import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import e from "express";

export const authRequired =(req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) return res.status(401).json({ message: "No hay token, autorización denegada" });

        Jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({ message: "Token Inválido" });

            req.user = user;
            
            next();

        })

    
}