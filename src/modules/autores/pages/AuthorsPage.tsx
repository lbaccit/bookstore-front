"use client";

import { useState, useEffect } from "react";
import Card, {Author } from "@/modules/autores/ui/AuthorCard";
import { useAuthorList} from "@/modules/autores/hooks/useAuthorServices";
import Modal from "@/shared/ui/Modal";
import Image from "next/image";

export default function AuthorsPage() {


    const { authors, isLoading, error, removeAuthor } = useAuthorList();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

    const handleAuthorClick = (author: Author) => {
        setSelectedAuthor(author);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAuthor(null);
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
            >
                {selectedAuthor && (
                    <div>
                        <Image
                            src={selectedAuthor.image}
                            alt={`Imagen para ${selectedAuthor.name}`}
                            width={500}
                            height={400}
                            className="w-full h-64 object-contain rounded"
                            />
                        <p className="mt-4">{selectedAuthor.description}</p>
                        <p className="mt-2 text-gray-500">Fecha de Nacimiento: {selectedAuthor.birthDate}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
