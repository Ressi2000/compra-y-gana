import Usuario from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { nombre_apellido, username, password, email, id_rol } = req.body;

        // Verificar si el usuario ya existe por su username o email
        const existingUser = await Usuario.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json(["El usuario ya existe."]);
        }

        // Encriptando la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre_apellido,
            username,
            password: passwordHash,
            email,
            id_rol,
            status: "ON", // Establecer el valor por defecto "ON"
        });

        // Guardar el nuevo usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();

        //Obteniendo el token
        const token = await createAccessToken({id: usuarioGuardado._id});

        //Guardando el token dentro de una cookie
        res.cookie('token', token);

        //Mensaje final 
        res.status(201).json({ message: "Usuario registrado exitosamente.", usuarioGuardado });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { username, password } = req.body;

        // Buscar el usuario por su nombre de usuario
        const usuario = await Usuario.findOne({ username });

        if (!usuario) {
            return res.status(401).json(['Credenciales incorrectas.']);
        }

        // Verificar la contraseña
        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (!passwordMatch) {
            return res.status(401).json(['Credenciales incorrectas.']);
        }

        // Generar un token JWT para el usuario autenticado
        const token = await createAccessToken({id: usuario._id});

        //Guardando el token dentro de una cookie
        res.cookie('token', token,);

        // Enviar el token y los datos del usuario como respuesta
        res.json({ token, user: usuario });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {

    const userFound = await Usuario.findById(req.user.id);

    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt,
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Acceso no Autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Acceso no Autorizado" });

        const userFound = await Usuario.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "Acceso no Autorizado" });

        // Enviar la respuesta después de verificar el token y el usuario
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};


