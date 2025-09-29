import { fetcher } from "@/shared/services/http";
import type { z } from "zod";
import type { BookSchema } from "@/modules/books/validation/BookSchema";
import { DEFAULT_EDITORIAL_ID } from "@/shared/services/config";

// Tipo inferido desde el Zod schema
export type BookFormData = z.infer<typeof BookSchema>;

export interface Book {
  id: number;
  name: string;
  description: string;
  image: string;
  publishingDate: string;
  isbn?: string;
  editorialId?: number;
}

export interface Review {
  id: number;
  name?: string;
  source: string;
  description: string;
  rating?: number;
  book?: {
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string;
    description: string;
    editorial: {
      id: number;
      name: string;
    };
  };
}

export interface ReviewPayload {
  name: string;
  source: string;
  description: string;
  rating?: number;
}

export interface Author {
  id: number;
  name: string;
  description: string;
  image?: string;
  birthDate?: string;
}

export interface Editorial {
  id: number;
  name: string;
}

export interface BookWithReviews extends Omit<Book, 'editorialId'> {
  reviews: Review[];
  authors: Author[];
  editorial: Editorial;
}

export const getBooks = (): Promise<Book[]> => {
  return fetcher<Book[]>("/books");
};

export const getBookById = (id: string | number): Promise<Book> => {
  return fetcher<Book>(`/books/${id}`);
};

export const getBookWithReviews = async (id: string | number): Promise<BookWithReviews> => {
  // Get book details with reviews
  const bookData = await fetcher<BookWithReviews>(`/books/${id}`);
  
  // For now, we'll return the book data as is
  // In the future, we might need to fetch author separately if the API doesn't include it
  // The API should ideally return author information with book details
  return bookData;
};

export const createBook = (data: BookFormData): Promise<Book> => {
  console.log("createBook called with:", data);
  
  // Validate required fields
  if (!data.name?.trim()) {
    throw new Error("Book name is required");
  }
  
  if (!data.description?.trim()) {
    throw new Error("Book description is required");
  }
  
  if (!data.publishingDate?.trim()) {
    throw new Error("Publishing date is required");
  }
  
  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.publishingDate.trim())) {
    throw new Error("Publishing date must be in YYYY-MM-DD format");
  }
  
  // Clean up the data - remove empty strings and convert them to undefined for optional fields
  const cleanData = {
    name: data.name.trim(),
    description: data.description.trim(),
    publishingDate: data.publishingDate.trim(),
    // Only include image if it's a valid URL or undefined
    ...(data.image && data.image.trim() ? { image: data.image.trim() } : {}),
    // Only include isbn if it's not empty
    ...(data.isbn && data.isbn.trim() ? { isbn: data.isbn.trim() } : {}),
  };
  
  const payload = {
    ...cleanData,
    editorial: { id: DEFAULT_EDITORIAL_ID },
  };
  
  console.log("Sending createBook payload to API:", JSON.stringify(payload, null, 2));
  console.log("Payload keys:", Object.keys(payload));
  console.log("Editorial object:", payload.editorial);
  
  return fetcher<Book>("/books", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// New function that accepts book data with author
export const createBookWithAuthor = (data: BookFormData, authorId: number): Promise<Book> => {
  console.log("📚 [BOOK SERVICE] createBookWithAuthor called with:", { data, authorId });
  
  // Validate required fields
  if (!authorId || authorId <= 0) {
    throw new Error("Invalid author ID provided");
  }
  
  if (!data.name?.trim()) {
    throw new Error("Book name is required");
  }
  
  if (!data.description?.trim()) {
    throw new Error("Book description is required");
  }
  
  if (!data.publishingDate?.trim()) {
    throw new Error("Publishing date is required");
  }
  
  // Clean up the data - remove empty strings and convert them to undefined for optional fields
  const cleanData = {
    name: data.name.trim(),
    description: data.description.trim(),
    publishingDate: data.publishingDate.trim(),
    image: data.image?.trim() || undefined,
    isbn: data.isbn?.trim() || undefined,
  };
  
  const payload = {
    ...cleanData,
    author: { id: authorId },
    editorial: { id: DEFAULT_EDITORIAL_ID },
  };
  
  console.log("📚 [BOOK SERVICE] Making POST to /books with payload:", JSON.stringify(payload, null, 2));
  
  const result = fetcher<Book>("/books", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  
  console.log("📚 [BOOK SERVICE] POST request sent to /books");
  return result;
};

export const updateBook = (
  id: number | string,
  data: BookFormData
): Promise<Book> => {
  const payload = {
    ...data,
    editorial: { id: DEFAULT_EDITORIAL_ID },
  };
  return fetcher<Book>(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};


export const deleteBook = async (id: number): Promise<void> => {
  const res = await fetch(`http://127.0.0.1:8080/api/books/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`DELETE /books/${id} → ${res.status} ${res.statusText}`);
};


export const createReview = (bookId: number | string, payload: ReviewPayload): Promise<Review> => {
  console.log(`Creating review for book ${bookId}:`, payload);
  return fetcher<Review>(`/books/${bookId}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// Associate a book with an author
export const associateBookWithAuthor = async (authorId: number, bookId: number): Promise<void> => {
  console.log(`Associating book ${bookId} with author ${authorId}`);
  
  // Validate inputs
  if (!authorId || authorId <= 0) {
    throw new Error("Invalid author ID");
  }
  
  if (!bookId || bookId <= 0) {
    throw new Error("Invalid book ID");
  }
  
  console.log("Association endpoint:", `/authors/${authorId}/books/${bookId}`);
  
  return fetcher<void>(`/authors/${authorId}/books/${bookId}`, {
    method: "POST",
  }).catch(error => {
    console.error("Association failed:", error);
    console.error("Failed with authorId:", authorId, "bookId:", bookId);
    throw error;
  });
};
