import { z } from "zod";

export const PrizeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre del premio debe tener al menos 2 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  year: z
    .number()
    .min(1900, { message: "El año debe ser mayor a 1900" })
    .max(new Date().getFullYear(), { message: "El año no puede ser futuro" })
    .optional(),
  category: z
    .string()
    .optional(),
});

export type PrizeFormData = z.infer<typeof PrizeSchema>;