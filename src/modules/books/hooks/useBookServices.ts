"use client";
import { useState, useEffect } from "react";
import { Book, getBooks } from "../services/BookService";

export const useBookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return { books, isLoading, error };
};