"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    AuthorWithAssociationsFormSchema,
    AuthorWithAssociationsFormInputData,
} from "../validation/AuthorSchema";
interface AuthorFormProps {
    onSubmit: SubmitHandler<AuthorWithAssociationsFormInputData>;
    defaultValues?: Partial<AuthorWithAssociationsFormInputData>;
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
    } = useForm<AuthorWithAssociationsFormInputData>({
        resolver: zodResolver(AuthorWithAssociationsFormSchema),
        defaultValues: {
            name: "", 
            description: "",
            birthDate: "",
            image: "",
            bookName: "",
            bookDescription: "",
            bookPublishingDate: "",
            bookImage: "",
            bookIsbn: "",
            prizeName: "",
            prizeDescription: "",
            prizePremiationDate: "",
            prizeOrganizationName: "",
            prizeOrganizationType: "",
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

            {/* Book Creation Section */}
            <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">Crear nuevo libro para este autor</h3>
                
                <div>
                    <label htmlFor="bookName" className="block font-medium">
                        Nombre del Libro
                    </label>
                    <input
                        id="bookName"
                        {...register("bookName")}
                        className="w-full p-2 border rounded"
                    />
                    {errors.bookName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bookName.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="bookDescription" className="block font-medium">
                        Descripción del Libro
                    </label>
                    <textarea
                        id="bookDescription"
                        {...register("bookDescription")}
                        className="w-full p-2 border rounded"
                        rows={3}
                    />
                    {errors.bookDescription && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bookDescription.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="bookPublishingDate" className="block font-medium">
                        Fecha de Publicación
                    </label>
                    <input
                        id="bookPublishingDate"
                        type="date"
                        {...register("bookPublishingDate")}
                        className="w-full p-2 border rounded"
                    />
                    {errors.bookPublishingDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bookPublishingDate.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="bookImage" className="block font-medium">
                        URL de la Imagen del Libro
                    </label>
                    <input
                        id="bookImage"
                        {...register("bookImage")}
                        className="w-full p-2 border rounded"
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    {errors.bookImage && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bookImage.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="bookIsbn" className="block font-medium">
                        ISBN
                    </label>
                    <input
                        id="bookIsbn"
                        {...register("bookIsbn")}
                        className="w-full p-2 border rounded"
                        placeholder="978-3-16-148410-0"
                    />
                    {errors.bookIsbn && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bookIsbn.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">Crear nuevo premio para este autor</h3>
                
                <div>
                    <label htmlFor="prizeName" className="block font-medium">
                        Nombre del Premio
                    </label>
                    <input
                        id="prizeName"
                        {...register("prizeName")}
                        className="w-full p-2 border rounded"
                    />
                    {errors.prizeName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.prizeName.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="prizeDescription" className="block font-medium">
                        Descripción del Premio
                    </label>
                    <textarea
                        id="prizeDescription"
                        {...register("prizeDescription")}
                        className="w-full p-2 border rounded"
                        rows={3}
                    />
                    {errors.prizeDescription && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.prizeDescription.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="prizePremiationDate" className="block font-medium">
                        Fecha de Premiación
                    </label>
                    <input
                        id="prizePremiationDate"
                        type="date"
                        {...register("prizePremiationDate")}
                        className="w-full p-2 border rounded"
                    />
                    {errors.prizePremiationDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.prizePremiationDate.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="prizeOrganizationName" className="block font-medium">
                        Nombre de la Organización
                    </label>
                    <input
                        id="prizeOrganizationName"
                        {...register("prizeOrganizationName")}
                        className="w-full p-2 border rounded"
                        placeholder="Real Academia Española"
                    />
                    {errors.prizeOrganizationName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.prizeOrganizationName.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label htmlFor="prizeOrganizationType" className="block font-medium">
                        Tipo de Organización
                    </label>
                    <select
                        id="prizeOrganizationType"
                        {...register("prizeOrganizationType")}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Selecciona el tipo</option>
                        <option value="PUBLICA">Pública</option>
                        <option value="PRIVADA">Privada</option>
                        <option value="MIXTA">Mixta</option>
                    </select>
                    {errors.prizeOrganizationType && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.prizeOrganizationType.message}
                        </p>
                    )}
                </div>

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

