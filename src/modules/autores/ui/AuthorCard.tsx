import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface Author {
  id: number;
  name: string;
  description: string;
  image: string;
  birthDate: string;
}

interface CardProps {
  author: Author;
  onClick?: () => void;
  onDelete?: (id: number) => void;
};

const Card = ({ author, onClick, onDelete }: CardProps) => {
  return (
    <div
      className="border rounded-lg shadow-lg overflow-hidden max-w-sm cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="w-full h-80 relative" onClick={onClick}>
        <Image
          src={author.image}
          alt={`Imagen para ${author.name}`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{author.name}</h3>
        <p className="text-gray-700">{author.description}</p>

        <div className="mt-4 flex space-x-2">
          <Link
            href={`crear/authors/${author.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Editar
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(author.id);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Borrar
          </button>

        </div>
      </div>
    </div>
  );
};

export default Card;

