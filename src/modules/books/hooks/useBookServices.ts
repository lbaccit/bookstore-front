"use client";
import { useState, useEffect, use } from "react";
import { getBooks} from "@/modules/books/services/bookService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import { set } from "zod";
import Card, {Book} from "@/modules/books/ui/BookCard";


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
                setError("No se pudieron cargar los autores.");
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, []);

    return { books, isLoading, error};
};
