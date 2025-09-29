import { z } from "zod";

export const BookSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre del libro debe tener al menos 2 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  publishingDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha debe tener el formato YYYY-MM-DD" }),
  image: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "" || z.string().url().safeParse(val).success, {
      message: "La imagen debe ser una URL válida o estar vacía"
    }),
  isbn: z
    .string()
    .optional()
    .or(z.literal("")),
});

// Form input type (before transformation)
export const BookWithAuthorFormSchema = BookSchema.extend({
  authorId: z
    .string()
    .min(1, { message: "Debes seleccionar un autor" }),
});

// API/output type (after transformation)
export const BookWithAuthorSchema = BookSchema.extend({
  authorId: z
    .string()
    .min(1, { message: "Debes seleccionar un autor" })
    .transform((val) => {
      const num = parseInt(val, 10);
      if (isNaN(num) || num <= 0) {
        throw new Error("Debes seleccionar un autor válido");
      }
      return num;
    }),
});

export type BookFormData = z.infer<typeof BookSchema>;
export type BookWithAuthorFormInputData = z.infer<typeof BookWithAuthorFormSchema>; // Form input type
export type BookWithAuthorFormData = z.infer<typeof BookWithAuthorSchema>; // API output type
