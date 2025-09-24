
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
    books: z
    .string()
    .min(5, {message: 'El nombre del libr debe tener al menos 5 caracteres'}),
    prizes: z
    .string()
    .min(5, {message: 'El nombre del premio debe tener al menos 5 caracteres'}),
});

export type AuthorFormData = z.infer<typeof AuthorSchema>;