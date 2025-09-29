"use client";

import { useState } from "react";
import Card, {Author } from "@/modules/autores/ui/AuthorCard";
import { useAuthorList} from "@/modules/autores/hooks/useAuthorServices";
import { getAuthorWithAssociations, AuthorWithAssociations } from "@/modules/autores/services/AuthorService";
import Modal from "@/shared/ui/Modal";

export default function AuthorsPage() {

    const { authors, isLoading, error, removeAuthor } = useAuthorList();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [authorDetails, setAuthorDetails] = useState<AuthorWithAssociations | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const handleAuthorClick = async (author: Author) => {
        setSelectedAuthor(author);
        setIsModalOpen(true);
        setLoadingDetails(true);
        
        try {
            const details = await getAuthorWithAssociations(author.id.toString());
            setAuthorDetails(details);
        } catch (error) {
            console.error('Error fetching author details:', error);
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAuthor(null);
        setAuthorDetails(null);
    };

    if (isLoading) {
        return <div className="text-center p-8">Cargando autores...</div>;
    }
    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }



    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6"> Listado de Autores </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
                {authors.map((author) => (
                    <Card
                        key={author.id} 
                        author={author}
                        onClick={() => handleAuthorClick(author)}
                        onDelete={removeAuthor}
                        />
                ))}
            </div>

            <Modal 
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={selectedAuthor?.name ?? "Detalle del Autor"}
            size="4xl"
            >
                {selectedAuthor && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Author Info Column */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Información del Autor</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">{selectedAuthor.description}</p>
                                <div className="pt-3 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Fecha de Nacimiento:</span> 
                                        <span className="ml-2">{selectedAuthor.birthDate}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                        
                            {loadingDetails ? (
                                <div className="text-center">
                                    <p className="text-gray-500">Cargando detalles...</p>
                                </div>
                            ) : authorDetails && (
                                <div>
                                    {authorDetails.books && authorDetails.books.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                                <span className="ml-2">Libros Asociados</span>
                                            </h3>
                                            <div className="space-y-4">
                                                {authorDetails.books.map((book) => (
                                                    <div key={book.id} className="p-4 rounded-lg shadow-sm">
                                                        <p className="font-semibold text-gray-800 text-lg">{book.name}</p>
                                                        {book.publishingDate && (
                                                            <p className="text-sm text-gray-600 mt-2 flex items-center">
                                                                <span className="mr-2"></span>
                                                                Fecha de publicación: {book.publishingDate}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Associated Prizes */}
                                    {authorDetails.prizes && authorDetails.prizes.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                                🏆 <span className="ml-2">Premios</span>
                                            </h3>
                                            <div className="space-y-4">
                                                {authorDetails.prizes.map((prize) => (
                                                    <div key={prize.id} className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                                                        <p className="font-semibold text-gray-800 text-lg">{prize.name}</p>
                                                        <p className="text-gray-700 mt-2 leading-relaxed">{prize.description}</p>
                                                        <div className="mt-3 space-y-1">
                                                            <p className="text-sm text-gray-600 flex items-center">
                                                                <span className="mr-2">📅</span>
                                                                Fecha de premiación: {prize.premiationDate}
                                                            </p>
                                                            <p className="text-sm text-gray-500 flex items-center">
                                                                <span className="mr-2">🏢</span>
                                                                {prize.organization.name} ({prize.organization.tipo})
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* No associations message */}
                                    {(!authorDetails.books || authorDetails.books.length === 0) && 
                                     (!authorDetails.prizes || authorDetails.prizes.length === 0) && (
                                        <div className="text-center text-gray-500 py-8">
                                            <p>📝 Este autor no tiene libros o premios asociados aún.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
