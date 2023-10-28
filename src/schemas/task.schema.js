import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
        .string({
            required_error: "El Título es obligatorio",
        })
        .min(1, "El Título es obligatorio"),
    description: z
        .string({
            required_error: "La descripción debe ser un string",
        })
        .min(1, "La descripción debe ser obligatoria"),
    date: z.string().datetime().optional(),
})