"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthorForm from "../ui/AuthorForm";
import { AuthorFormData } from "../validation/AuthorSchema";
import { createAuthor } from "../services/crearService";

import { useNotificationStore } from "@/shared/store/useNotificationStore";


export default function AuthorCreatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const showNotification = useNotificationStore(
        (state) => state.showNotification
    );

    const handleCreateAuthor = async (data: AuthorFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createAuthor(data);
            showNotification("Autor creado correctamente", "success");
            router.push("/authors");
        }
        catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Ocurrió un error";
            setError(errorMessage);
            showNotification(errorMessage, "error");
        } finally {
            setIsSubmitting(false);
        }
    }; 

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
            <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
        </div>
    );
}

