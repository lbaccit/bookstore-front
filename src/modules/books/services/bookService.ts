import {fetcher} from "@/shared/services/http";
import { Book } from "../ui/BookCard";


export const getBooks = (): Promise<Book[]> => {
    return fetcher<Book[]>("/books");

};

export const getBoooksbyId = (id: string): Promise<Book> => {
    return fetcher<Book>(`/books/${id}`);
};

export const postBookbyAuthor = (id: string): Promise<Book> => {
    return fetcher<Book>(`authors/books/${id}`);
};

