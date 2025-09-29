import {Author} from "../ui/AuthorCard";
import {fetcher} from "../../../shared/services/http";
import { BasicAuthorFormData } from "../../crear/services/crearService";

// Extended Author interface with associated books and prizes
export interface AuthorWithAssociations extends Author {
  books?: Array<{
    id: number;
    name: string;
    image?: string;
    publishingDate?: string;
  }>;
  prizes?: Array<{
    id: number;
    name: string;
    description: string;
    premiationDate: string;
    organization: {
      id: number;
      name: string;
      tipo: string;
    };
  }>;
}



export const getAuthors = (): Promise<Author[]> => {
    return fetcher<Author[]>("/authors");

};

export const getAuthorById = (id: string): Promise<Author> => {
    return fetcher<Author>(`/authors/${id}`);
};

export const getAuthorWithAssociations = (id: string): Promise<AuthorWithAssociations> => {
    return fetcher<AuthorWithAssociations>(`/authors/${id}`);
};

export const updateAuthor = (
    id: number | string,
    data: BasicAuthorFormData
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