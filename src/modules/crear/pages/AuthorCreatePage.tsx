"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthorForm from "../ui/AuthorForm";
import { 
    AuthorWithAssociationsFormInputData, 
    AuthorWithAssociationsSchema 
} from "../validation/AuthorSchema";
import { createAuthor, BasicAuthorFormData } from "../services/crearService";
import { createBookWithAuthor } from "@/modules/books/services/BookService";
import { createPrizeWithAuthor, PrizeFormData } from "@/modules/prizes/services/PrizeService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";


export default function AuthorCreatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const showNotification = useNotificationStore(
        (state) => state.showNotification
    );

    // Log the expected endpoints when component mounts
    useEffect(() => {
        console.log("📋 [AUTHOR CREATION PAGE] Expected POST endpoints during author creation:");
        console.log("   1. POST /authors - Create the author");
        console.log("   2. POST /books - Create the book with author association");
        console.log("   3. POST /prizes - Create the prize");
        console.log("   4. POST /prizes/{prizeId}/author/{authorId} - Associate prize with author");
    }, []);

    const handleCreateAuthor = async (data: AuthorWithAssociationsFormInputData) => {
        setIsSubmitting(true);
        try {
            // Transform the data
            const transformedData = AuthorWithAssociationsSchema.parse(data);
            
            // Extract author data, book data, and prize data
            const {
                bookName, bookDescription, bookPublishingDate, bookImage, bookIsbn,
                prizeName, prizeDescription, prizePremiationDate, prizeOrganizationName, prizeOrganizationType,
                ...authorData
            } = transformedData;
            
            console.log("👤 [AUTHOR CREATION] Starting author creation process with data:", authorData);
            
            // Step 1: Create the author
            console.log("👤 [STEP 1] Creating author...");
            const basicAuthorData: BasicAuthorFormData = {
                name: authorData.name,
                description: authorData.description,
                birthDate: authorData.birthDate,
                image: authorData.image,
            };
            const createdAuthor = await createAuthor(basicAuthorData);
            console.log("✅ [STEP 1] Author created successfully:", createdAuthor);
            
            // Step 2: Create book and associate with author
            console.log("📚 [STEP 2] Creating book and associating with author...");
            try {
                const bookData = {
                    name: bookName,
                    description: bookDescription,
                    publishingDate: bookPublishingDate,
                    image: bookImage,
                    isbn: bookIsbn,
                };
                console.log("📚 [STEP 2] Book data prepared:", bookData);
                await createBookWithAuthor(bookData, createdAuthor.id);
                console.log("✅ [STEP 2] Book created and associated with author successfully");
            } catch (bookError) {
                console.error("Error creating book for author:", bookError);
                showNotification("Autor creado, pero hubo un error creando el libro", "error");
            }
            
            // Step 3: Create prize and associate with author
            console.log("🏆 [STEP 3] Creating prize and associating with author...");
            try {
                const prizeData: PrizeFormData = {
                    name: prizeName,
                    description: prizeDescription,
                    premiationDate: prizePremiationDate,
                    organizationName: prizeOrganizationName,
                    organizationType: prizeOrganizationType,
                };
                console.log("🏆 [STEP 3] Prize data prepared:", prizeData);
                await createPrizeWithAuthor(prizeData, createdAuthor.id);
                console.log("✅ [STEP 3] Prize created and associated with author successfully");
            } catch (prizeError) {
                console.error("Error creating prize for author:", prizeError);
                showNotification("Autor creado, pero hubo un error creando el premio", "error");
            }
            
            console.log("✅ [AUTHOR CREATION] All steps completed successfully!");
            console.log("📋 [SUMMARY] Endpoints called during author creation:");
            console.log("   1. POST /authors (create author)");
            console.log("   2. POST /books (create book)");
            console.log("   3. POST /prizes (create prize)");
            console.log("   4. POST /prizes/{prizeId}/author/{authorId} (associate prize with author)");
            
            showNotification("Autor creado correctamente con sus asociaciones", "success");
            router.push("/authors");
        }
        catch (err) {
            console.error("Error creating author:", err);
            const errorMessage =
                err instanceof Error ? err.message : "Ocurrió un error";
            showNotification(errorMessage, "error");
        } finally {
            setIsSubmitting(false);
        }
    }; 

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
            <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
        </div>
    );
}

