"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  BookWithAuthorFormSchema,
  BookWithAuthorFormInputData,
  BookWithAuthorFormData,
} from "@/modules/books/validation/BookSchema";
import { getAuthors } from "@/modules/autores/services/AuthorService";
import type { Author } from "@/modules/autores/ui/AuthorCard";

interface BookFormProps {
  onSubmit: SubmitHandler<BookWithAuthorFormData>;
  defaultValues?: Partial<BookWithAuthorFormInputData>;
  isSubmitting: boolean;
  onRefreshAuthors?: () => void;
}

function BookForm({
  onSubmit,
  defaultValues,
  isSubmitting,
  onRefreshAuthors,
}: BookFormProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookWithAuthorFormInputData>({
    resolver: zodResolver(BookWithAuthorFormSchema),
    defaultValues: {
      name: "",
      description: "",
      publishingDate: "",
      image: "",
      isbn: "",
      authorId: "",
      ...defaultValues,
    },
  });

  // Extract loadAuthors function so it can be called on demand
  const loadAuthors = async () => {
    try {
      setIsLoading(true);
      const authorsData = await getAuthors();
      setAuthors(authorsData);
    } catch (error) {
      console.error("Error loading authors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load authors on component mount
  useEffect(() => {
    loadAuthors();
  }, []);

  // Auto-refresh authors when page gains focus (helpful when returning from author creation)
  useEffect(() => {
    const handleFocus = () => {
      loadAuthors();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Handle refresh authors
  const handleRefreshAuthors = async () => {
    await loadAuthors();
    onRefreshAuthors?.(); // Call optional callback
  };

  const handleFormSubmit = (data: BookWithAuthorFormInputData) => {
    // Debug: Log form data before transformation
    console.log("Raw form data:", data);
    
    // Transform the form data to match the expected API type
    const transformedData: BookWithAuthorFormData = {
      ...data,
      authorId: parseInt(data.authorId, 10),
    };
    
    console.log("Transformed data:", transformedData);
    console.log("Author ID parsed as:", parseInt(data.authorId, 10));
    
    onSubmit(transformedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium">
          Nombre del Libro
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="authorId" className="block font-medium">
            Autor
          </label>
          <button
            type="button"
            onClick={handleRefreshAuthors}
            disabled={isLoading}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
          >
            {isLoading ? "Actualizando..." : "↻ Actualizar"}
          </button>
        </div>
        <select
          id="authorId"
          {...register("authorId")}
          disabled={isLoading}
          className="w-full p-2 border rounded"
        >
          <option value="">
            {isLoading ? "Cargando autores..." : "Selecciona un autor"}
          </option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.authorId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.authorId.message}
          </p>
        )}
        <div className="mt-2">
          <Link
            href="/crear/authors/new"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            + Crear nuevo autor
          </Link>
        </div>
      </div>

      <div>
        <label htmlFor="publishingDate" className="block font-medium">
          Fecha de Publicación
        </label>
        <input
          id="publishingDate"
          type="date"
          {...register("publishingDate", {
            setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
          })}
          className="w-full p-2 border rounded"
        />
        {errors.publishingDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.publishingDate.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block font-medium">
          URL de la Imagen
        </label>
        <input
          id="image"
          {...register("image")}
          className="w-full p-2 border rounded"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">
            {errors.image.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="isbn" className="block font-medium">
          ISBN (Opcional)
        </label>
        <input
          id="isbn"
          {...register("isbn")}
          className="w-full p-2 border rounded"
        />
        {errors.isbn && (
          <p className="text-red-500 text-sm mt-1">
            {errors.isbn.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Guardando..." : "Crear Libro"}
      </button>
    </form>
  );
}

export default BookForm;