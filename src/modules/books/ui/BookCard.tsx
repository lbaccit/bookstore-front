import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Book {
  id: number;
  name: string;
  description: string;
  image: string;
  publishingDate: string;
}

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

const BookCard = ({ book, onClick }: BookCardProps) => {
  return (
    <div
      className="border rounded-lg shadow-lg overflow-hidden max-w-sm cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="w-full h-80 relative" onClick={onClick}>
        <Image
          src={book.image}
          alt={`Portada: ${book.name}`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-1 line-clamp-2">{book.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Publicado: {new Date(book.publishingDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700 line-clamp-3">{book.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/books/${book.id}`}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Ver detalle
          </Link>

          <Link
            href={`crear/books/${book.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
