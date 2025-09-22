"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useParams} from "next/navigation";
import AuthorForm from "@/modules/crear/ui/AuthorForm";
import type {AuthorFormData} from "@/modules/crear/validation/AuthorSchema";
import {getAuthorById, updateAuthor} from "@/modules/autores/services/AuthorService";


export default function AuthorEditPage() {
    const router = useRouter();
    const params = useParams<{ authorId: string }>();
    const authorId = params.authorId
    const [initialData, setInitialData] = useState<AuthorFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const author = await getAuthorById(params.authorId);
                setInitialData({
                    name: author.name ?? "", 
                    description: author.description ?? "",
                    image: author.image ?? "",
                    birthDate: (author.birthDate ?? "").slice(0, 10),
                });

            } catch (e) {
                setError("No se pudo al cargar el autor correctamente");
                }
            finally {
                setIsLoading(false);
            }
        };
        if (authorId) load();
  }, [authorId]);

    const handleUpdateAuthor = async (data: AuthorFormData) => {
        try {
            setSaving(true);
            await updateAuthor(params.authorId, data);
            router.push("/authors");
        } 
        catch (e) {
                setError("No se pudo actualizar el autor");
            }
            finally {
                setSaving(false);
            }
        };

        if (isLoading) return <div className="p-8 text center">Cargando...</div>;
        if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
        if (!initialData) return null; 

        return (
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Editar Autor</h1>
                <AuthorForm
                    onSubmit={handleUpdateAuthor}
                    defaultValues={initialData}
                    isSubmitting={saving}
                />
            </div>
        );
    }
