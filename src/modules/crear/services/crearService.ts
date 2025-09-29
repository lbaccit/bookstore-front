import { fetcher } from "../../../shared/services/http";
import { Author } from "../../autores/ui/AuthorCard";

// Basic author data for creation (without associations)
export interface BasicAuthorFormData {
  name: string;
  description: string;
  birthDate: string;
  image?: string;
}

export const createAuthor = (data: BasicAuthorFormData): Promise<Author> => {
  console.log("👤 [AUTHOR SERVICE] Making POST to /authors with data:", JSON.stringify(data, null, 2));
  
  const result = fetcher<Author>("/authors", {
    method: "POST",
    body: JSON.stringify(data),
  });
  
  console.log("👤 [AUTHOR SERVICE] POST request sent to /authors");
  return result;
};
