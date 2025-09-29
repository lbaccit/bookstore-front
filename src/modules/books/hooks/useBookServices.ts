"use client";
import { useState, useEffect } from "react";
import { Book } from "@/modules/books/ui/BookCard";
import { getBooks, deleteBook } from "@/modules/books/services/BookService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export const useBookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { showNotification } = useNotificationStore();

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            }
            catch {
                setError("No se pudieron cargar los libros.");
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, []);

    const removeBook = async (id: number) => {
        const ok = window.confirm("¿Estás seguro de que deseas eliminar este libro?");
        if (!ok) return;
        try {
            await deleteBook(id);
            setBooks((prev) => prev.filter((book) => book.id !== id));
            showNotification("Libro eliminado correctamente", "success");
        } catch {
            showNotification("No se pudo eliminar el libro", "error");
        }
    };

    return { books, isLoading, error, removeBook };
};