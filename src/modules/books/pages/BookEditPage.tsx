"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BookForm from "@/modules/books/ui/BookForm";
import type { BookWithAuthorFormInputData, BookWithAuthorFormData } from "@/modules/books/validation/BookSchema";
import { getBookWithReviews, updateBook, associateBookWithAuthor } from "@/modules/books/services/BookService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function BookEditPage() {
    const router = useRouter();
    const params = useParams<{ bookId: string }>();
    const bookId = params.bookId;
    const [initialData, setInitialData] = useState<BookWithAuthorFormInputData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { showNotification } = useNotificationStore();

    useEffect(() => {
        const load = async () => {
            try {
                // Use getBookWithReviews to get the book with authors information
                const book = await getBookWithReviews(params.bookId);
                
                // Get the first author's ID if available
                const currentAuthorId = book.authors && book.authors.length > 0 
                    ? book.authors[0].id.toString() 
                    : "";
                
                setInitialData({
                    name: book.name ?? "",
                    description: book.description ?? "",
                    image: book.image ?? "",
                    publishingDate: book.publishingDate ?? "",
                    isbn: book.isbn ?? "",
                    authorId: currentAuthorId,
                });
            } catch {
                setError("No se pudo cargar el libro correctamente");
            } finally {
                setIsLoading(false);
            }
        };
        if (bookId) load();
    }, [bookId, params.bookId]);

    const handleUpdateBook = async (data: BookWithAuthorFormData) => {
        try {
            setSaving(true);
            
            // Extract book data and author ID
            const { authorId, ...bookData } = data;
            
            // Step 1: Update the book
            const updatedBook = await updateBook(params.bookId, bookData);
            
            // Step 2: Associate the book with the author if authorId is provided
            if (authorId) {
                try {
                    await associateBookWithAuthor(authorId, updatedBook.id);
                    showNotification("Libro y autor actualizados exitosamente", "success");
                } catch (associationError) {
                    console.error("Error associating book with author:", associationError);
                    showNotification("Libro actualizado, pero hubo un error asociando el autor", "error");
                }
            } else {
                showNotification("Libro actualizado exitosamente", "success");
            }
            
            router.push("/books");
        } catch {
            setError("No se pudo actualizar el libro");
            showNotification("Error al actualizar el libro", "error");
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center">Cargando...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!initialData) return null;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Editar Libro</h1>
            <BookForm
                onSubmit={handleUpdateBook}
                defaultValues={initialData}
                isSubmitting={saving}
            />
        </div>
    );
}