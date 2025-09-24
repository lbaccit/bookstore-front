import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Book {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface CardProps {
  book: Book;
  onClick?: () => void;
};

const Card = ({ book, onClick}: CardProps) => {
  return (
    <div
      className="border rounded-lg shadow-lg overflow-hidden max-w-sm cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="w-full h-80 relative" onClick={onClick}>
        <Image
          src={book.image}
          alt={`Imagen para ${book.name}`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{book.name}</h3>
        <p className="text-gray-700">{book.description}</p>
      </div>
    </div>
  );
};

export default Card;

