
import {z} from 'zod';

export const AuthorSchema = z.object({
    name: z
    .string()
    .min(5, {message: 'El nombre debe tener al menos 2 caracteres'}),
    description: z
    .string()
    .min(10, {message: 'La descripción debe tener al menos 10 caracteres'}),
    birthDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD'}),
    image: z
    .string()
    .url({message: 'La imagen debe ser una URL válida'})
    .optional()
    .or(z.literal('')),
    // Book creation fields
    bookName: z
    .string()
    .min(2, { message: "El nombre del libro debe tener al menos 2 caracteres" }),
    bookDescription: z
    .string()
    .min(10, { message: "La descripción del libro debe tener al menos 10 caracteres" }),
    bookPublishingDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de publicación debe tener el formato YYYY-MM-DD" }),
    bookImage: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === "" || z.string().url().safeParse(val).success, {
      message: "La imagen del libro debe ser una URL válida o estar vacía"
    }),
    bookIsbn: z
    .string()
    .optional()
    .or(z.literal("")),
    // Prize creation fields
    prizeName: z
    .string()
    .min(2, { message: "El nombre del premio debe tener al menos 2 caracteres" }),
    prizeDescription: z
    .string()
    .min(10, { message: "La descripción del premio debe tener al menos 10 caracteres" }),
    prizePremiationDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha de premiación debe tener el formato YYYY-MM-DD" }),
    prizeOrganizationName: z
    .string()
    .min(2, { message: "El nombre de la organización debe tener al menos 2 caracteres" }),
    prizeOrganizationType: z
    .string()
    .min(1, { message: "Debes seleccionar el tipo de organización" }),
});

// Form input type (with string IDs)
export const AuthorWithAssociationsFormSchema = AuthorSchema;

// API output type (same as form input since no transformation needed)
export const AuthorWithAssociationsSchema = AuthorSchema;

export type AuthorFormData = z.infer<typeof AuthorSchema>;
export type AuthorWithAssociationsFormInputData = z.infer<typeof AuthorWithAssociationsFormSchema>;
export type AuthorWithAssociationsFormData = z.infer<typeof AuthorWithAssociationsSchema>;