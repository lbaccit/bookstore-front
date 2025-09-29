"use client";

import BookCard from "@/modules/books/ui/BookCard";
import { useBookList } from "@/modules/books/hooks/useBookServices";
import Link from "next/link";

export default function BooksPage() {
    const { books, isLoading, error, removeBook } = useBookList();

    if (isLoading) {
        return <div className="text-center p-8">Cargando libros...</div>;
    }
    
    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Listado de Libros</h1>
                <Link
                    href="/books/create"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                >
                    Crear Nuevo Libro
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
                {books.map((book) => (
                    <BookCard
                        key={book.id} 
                        book={book}
                    />
                ))}
            </div>

            {books.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                    No hay libros disponibles. 
                    <Link 
                        href="/books/create" 
                        className="text-green-600 hover:text-green-700 ml-1"
                    >
                        ¡Crea el primero!
                    </Link>
                </div>
            )}
        </div>
    );
}