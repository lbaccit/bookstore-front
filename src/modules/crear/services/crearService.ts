import { fetcher } from "@/shared/services/http";
import { AuthorFormData } from "../validation/AuthorSchema";
import { Author } from "../../autores/ui/AuthorCard";

export const createAuthor = (data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>("/authors", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
