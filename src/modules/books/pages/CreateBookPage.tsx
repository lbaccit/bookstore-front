"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BookForm from "@/modules/books/ui/BookForm";
import { createBook, associateBookWithAuthor } from "@/modules/books/services/BookService";
import type { BookWithAuthorFormData } from "@/modules/books/validation/BookSchema";
import { useNotificationStore } from "@/shared/store/useNotificationStore";


export default function CreateBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
    const showNotification = useNotificationStore(
        (state) => state.showNotification
    );


  const handleSubmit = async (data: BookWithAuthorFormData) => {
    let createdBook: { id: number } | null = null;
    
    try {
      setIsSubmitting(true);
      
      // Extract author ID and book data
      const { authorId, ...bookData } = data;
      
      // Debug: Log the data being sent
      console.log("Submitting book data:", { bookData, authorId });
      
      // Step 1: Create the book (without author in payload)
      try {
        createdBook = await createBook(bookData);
        console.log("Book created:", createdBook);
        showNotification("Libro creado exitosamente", "success");
      } catch (bookError) {
        console.error("Error creating book:", bookError);
        throw new Error(`Error creando el libro: ${bookError instanceof Error ? bookError.message : 'Error desconocido'}`);
      }
      
      // Step 2: Associate the book with the author using the specific endpoint
      try {
        await associateBookWithAuthor(authorId, createdBook.id);
        console.log("Book associated with author successfully!");
        showNotification("Libro asociado con el autor exitosamente", "success");
      } catch (associationError) {
        console.error("Error associating book with author:", associationError);
        showNotification("Libro creado pero no se pudo asociar con el autor", "error");
        // Note: Book was created successfully, just association failed
      }
      
      // Redirect after successful creation (even if association failed)
      router.push("/books");
      
    } catch (error) {
      console.error("Error in book creation process:", error);
      
      // Show more detailed error to user
      if (error instanceof Error) {
        showNotification(error.message, "error");
      } else {
        showNotification("Ocurrió un error inesperado al crear el libro", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Libro</h1>
      <BookForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

