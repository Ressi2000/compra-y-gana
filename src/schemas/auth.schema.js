import { z } from "zod";

// Esquema de validación con Zod para el formualrio de registro
export const registroUsuarioSchema = z.object({
    nombre_apellido: z.string().min(1, "El nombre y apellido es obligatorio."),
    username: z
        .string()
        .min(1, "El nombre de usuario es obligatorio.")
        .max(50, "El nombre de usuario no puede tener más de 50 caracteres."),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
    email: z
        .string()
        .min(1, "El correo electrónico es obligatorio.")
        .email("El correo electrónico no es válido."),
});

// Esquema de validación para el formulario de login
export const loginSchema = z.object({
    username: z
        .string()
        .min(1, "El nombre de usuario es obligatorio.")
        .max(50, "El nombre de usuario no puede tener más de 50 caracteres."),
    password: z
        .string()
        .min(1, "La contraseña es obligatoria."),
});


// Función para validar los datos del formulario de registro
// export const validarRegistroUsuario = (datos) => {
//     try {
//         // Intenta validar los datos con el esquema
//         registroUsuarioSchema.parse(datos);
//         // Si no hay errores de validación, retorna null (sin errores).
//         return null;
//     } catch (error) {
//         // Si hay errores de validación, retorna un objeto con los mensajes de error.
//         return {
//             nombre_apellido: error.issues.find((issue) => issue.path[0] === "nombre_apellido")?.message,
//             username: error.issues.find((issue) => issue.path[0] === "username")?.message,
//             password: error.issues.find((issue) => issue.path[0] === "password")?.message,
//             email: error.issues.find((issue) => issue.path[0] === "email")?.message,
//             id_rol: error.issues.find((issue) => issue.path[0] === "id_rol")?.message,
//     
//         };
//     }
// };

// Función para validar los datos del formulario de login
// export const validarLogin = (datos) => {
//     try {
//         // Intenta validar los datos con el esquema
//         loginSchema.parse(datos);
//         // Si no hay errores de validación, retorna null (sin errores).
//         return null;
//     } catch (error) {
//         // Si hay errores de validación, retorna un objeto con los mensajes de error.
//         return {
//             username: error.issues.find((issue) => issue.path[0] === "username")?.message,
//             password: error.issues.find((issue) => issue.path[0] === "password")?.message,
//         };
//     }
// };