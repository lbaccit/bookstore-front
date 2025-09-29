"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getBookWithReviews, createReview, type BookWithReviews, type Review } from "../services/BookService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import Modal from "@/shared/ui/Modal";
import ReviewForm from "@/modules/books/ui/ReviewForm";
import type { ReviewFormData } from "@/modules/books/validation/ReviewSchema";

export default function BookDetailPage() {
    const params = useParams<{ id: string }>();
    const bookId = params.id;
    const [book, setBook] = useState<BookWithReviews | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const { showNotification } = useNotificationStore();

    useEffect(() => {
        const loadBook = async () => {
            try {
                const bookData = await getBookWithReviews(bookId);
                setBook(bookData);
            } catch {
                setError("No se pudo cargar el detalle del libro");
                showNotification("Error al cargar el libro", "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (bookId) {
            loadBook();
        }
    }, [bookId, showNotification]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const handleCreateReview = async (reviewData: ReviewFormData) => {
        try {
            setIsSubmittingReview(true);
            const newReview = await createReview(bookId, reviewData);
            
            if (book) {
                setBook({
                    ...book,
                    reviews: [...book.reviews, newReview]
                });
            }
            
            showNotification("Reseña agregada exitosamente", "success");
            setIsReviewModalOpen(false);
        } catch {
            showNotification("Error al agregar la reseña", "error");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (isLoading) {
        return <div className="container mx-auto p-8 text-center">Cargando detalle del libro...</div>;
    }

    if (error || !book) {
        return (
            <div className="container mx-auto p-8 text-center">
                <div className="text-red-500 mb-4">{error || "Libro no encontrado"}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="flex justify-center">
                    <div className="w-full max-w-xs">
                        <Image
                            src={book.image}
                            alt={`Portada de ${book.name}`}
                            width={300}
                            height={400}
                            className="w-full h-auto object-contain shadow-lg"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900">{book.name}</h1>
                    
                    <div className="bg-white pl-4 space-y-2">
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">Información del Libro</h2>
                        
                        <p className="text-lg text-gray-600">
                            <span className="font-semibold">Fecha de Publicación:</span> {formatDate(book.publishingDate)}
                        </p>
                        
                        {book.isbn && (
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">ISBN:</span> {book.isbn}
                            </p>
                        )}
                        
                        {book.editorial && (
                            <p className="text-lg text-gray-600">
                                <span className="font-semibold">Editorial:</span> {book.editorial.name}
                            </p>
                        )}
                        
                        <div className="pt-2">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Descripción</h3>
                            <p className="text-gray-700 leading-relaxed">{book.description}</p>
                        </div>
                    </div>

                    {book.authors && book.authors.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                {book.authors.length > 1 ? 'Autores' : 'Autor'}
                            </h2>
                            {book.authors.map((author) => (
                                <div key={author.id} className="mb-4 last:mb-0">
                                    <h3 className="text-lg font-medium mb-2">{author.name}</h3>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{author.description}</p>
                                    {author.birthDate && (
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Fecha de nacimiento:</span> {formatDate(author.birthDate)}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t pt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Reseñas ({book.reviews ? book.reviews.length : 0})
                    </h2>
                    <button
                        onClick={() => setIsReviewModalOpen(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Agregar Reseña
                    </button>
                </div>
                
                {book.reviews && book.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {book.reviews.map((review: Review) => (
                            <div key={review.id} className="bg-white border rounded-lg p-6 shadow-sm">
                                <div className="mb-3">
                                    {review.name && review.name.trim() && (
                                        <h3 className="font-semibold text-lg">{review.name}</h3>
                                    )}
                                    {review.source && review.source.trim() && (
                                        <p className="text-sm text-gray-500">Por: {review.source}</p>
                                    )}
                                </div>
                                
                                <p className="text-gray-700 mb-3">{review.description}</p>
                                
                                {review.rating && (
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>Calificación: {review.rating}/5</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>Este libro aún no tiene reseñas.</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                title="Agregar Nueva Reseña"
            >
                <ReviewForm
                    onSubmit={handleCreateReview}
                    isSubmitting={isSubmittingReview}
                    onCancel={() => setIsReviewModalOpen(false)}
                />
            </Modal>
        </div>
    );
}