"use client";
import { useState, useEffect, use } from "react";
import Card, {Author } from "@/modules/autores/ui/AuthorCard";
import { getAuthors , deleteAuthor } from "@/modules/autores/services/AuthorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import { set } from "zod";


export const useAuthorList = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { showNotification } = useNotificationStore();

    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const data = await getAuthors();
                setAuthors(data);
            }
            catch {
                setError("No se pudieron cargar los autores.");
            } finally {
                setIsLoading(false);
            }
        };

        loadAuthors();
    }, []);

    const removeAuthor = async (id: number) => {
        const ok = window.confirm("¿Estás seguro de que deseas eliminar este autor?");
        if (!ok) return;
        try {
            await deleteAuthor(id);
            setAuthors((prev) => prev.filter((author) => author.id !== id));
            showNotification("Autor eliminado correctamente", "success");
        } catch (e) {
            showNotification("No se pudo eliminar el autor", "error");
        }
    };

    return { authors, isLoading, error, removeAuthor};
};
