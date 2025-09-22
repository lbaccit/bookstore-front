import {Author} from "@/modules/autores/ui/AuthorCard";
import {fetcher} from "@/shared/services/http";
import type {AuthorFormData} from "@/modules/crear/validation/AuthorSchema";



export const getAuthors = (): Promise<Author[]> => {
    return fetcher<Author[]>("/authors");

};

export const getAuthorById = (id: string): Promise<Author> => {
    return fetcher<Author>(`/authors/${id}`);
};

export const updateAuthor = (
    id: number | string,
    data: AuthorFormData
): Promise<Author> => {
    return fetcher<Author>(`/authors/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

export const deleteAuthor = async (id: number): Promise<void> => {
  const res = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`DELETE /authors/${id} → ${res.status} ${res.statusText}`);
  }

};