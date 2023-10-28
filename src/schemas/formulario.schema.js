import { z } from "zod";

// Esquema de validación para el formulario de sorteo
export const formularioSchema = z.object({
    nombreApellido: z.string().min(1, "El nombre y apellido son obligatorios."),
    cedulaIdentidad: z.string().min(1, "La cédula de identidad es obligatoria."),
    numeroFactura: z.string().min(1, "El número de factura es obligatorio."),
    establecimientoComercial: z.string().min(1, "El establecimiento comercial es obligatorio."),
    numeroContacto: z.string().min(1, "El número de contacto es obligatorio."),
    correoElectronico: z
        .string()
        .min(1, "El correo electrónico es obligatorio.")
        .email("El correo electrónico no es válido."),
    // lugarDeVisita: z.string().min(1, "El lugar de visita es obligatorio."),
    // tiendasFrecuentadas: z.string().min(1, "Las tiendas frecuentadas son obligatorias."),
    // edad: z.number().int().refine(value => value >= 18, {
    //     message: "La edad debe ser un número entero y mayor o igual a 18",
    //     path: ['edad'], // Field that this constraint applies to
    //   }),
});


// Función para validar los datos del formulario
// export const validarFormulario = (datos) => {
//     try {
//         // Intenta validar los datos con el esquema
//         formularioSchema.parse(datos);
//         // Si no hay errores de validación, retorna null (sin errores).
//         return null;
//     } catch (error) {
//         // Si hay errores de validación, retorna un objeto con los mensajes de error.
//         return {
//             nombreApellido: error.issues.find((issue) => issue.path[0] === "nombreApellido")?.message,
//             cedulaIdentidad: error.issues.find((issue) => issue.path[0] === "cedulaIdentidad")?.message,
//             numeroFactura: error.issues.find((issue) => issue.path[0] === "numeroFactura")?.message,
//             establecimientoComercial: error.issues.find((issue) => issue.path[0] === "establecimientoComercial")?.message,
//             numeroContacto: error.issues.find((issue) => issue.path[0] === "numeroContacto")?.message,
//             correoElectronico: error.issues.find((issue) => issue.path[0] === "correoElectronico")?.message,
//             lugarDeVisita: error.issues.find((issue) => issue.path[0] === "lugarDeVisita")?.message,
//             tiendasFrecuentadas: error.issues.find((issue) => issue.path[0] === "tiendasFrecuentadas")?.message,
//         };
//     }
// };