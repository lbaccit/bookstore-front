import { z } from "zod";

export const ReviewSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(100, { message: "El nombre debe tener máximo 100 caracteres" }),
  source: z
    .string()
    .min(1, { message: "La fuente es requerida" })
    .max(100, { message: "La fuente debe tener máximo 100 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(1000, { message: "La descripción debe tener máximo 1000 caracteres" }),
  rating: z
    .number()
    .min(1, { message: "La calificación debe ser al menos 1" })
    .max(5, { message: "La calificación debe ser máximo 5" })
    .optional(),
});

export type ReviewFormData = z.infer<typeof ReviewSchema>;