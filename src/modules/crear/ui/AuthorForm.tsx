"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AuthorSchema,
    AuthorFormData,
} from "@/modules/crear/validation/AuthorSchema";


interface AuthorFormProps {
    onSubmit: SubmitHandler<AuthorFormData>;
    defaultValues?: AuthorFormData;
    isSubmitting: boolean;
}

export default function AuthorForm({
    onSubmit,
    defaultValues,
    isSubmitting,
}: AuthorFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthorFormData>({
        resolver: zodResolver(AuthorSchema),
        defaultValues: {
            name: "", 
            description: "",
            birthDate: "",
            image: "",
            ...defaultValues,
        },  
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block font-medium">
                    Nombre del Autor
                </label>
                <input
                    id="name"
                    {...register("name")}
                    className="w-full p-2 border rounded" />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block font-medium">
                    Descripción
                </label>
                <textarea
                    id="description"
                    {...register("description")}
                    className="w-full p-2 border rounded"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="birthDate" className="block font-medium">
                    Fecha de Nacimiento
                </label>
                <input
                    id="birthDate"
                    type="date"                         
                    {...register("birthDate", {
                        setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                    })}
                    className="w-full p-2 border rounded"
                    />
                {errors.birthDate && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.birthDate.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor="image" className="block font-medium">
                    URL de la Imagen
                </label>
                <input
                    id="image"
                    {...register("image")}
                    className="w-full p-2 border rounded"
                    />
                {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.image.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {isSubmitting ? "Saving..." : "Submit"}
            </button>
        </form>
    );
}

