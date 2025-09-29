import { fetcher } from "@/shared/services/http";

export interface Prize {
  id: number;
  name: string;
  description: string;
  premiationDate: string;
  organization: {
    id: number;
    name: string;
    tipo: string;
  };
}

export interface PrizeFormData {
  name: string;
  description: string;
  premiationDate: string;
  organizationName: string;
  organizationType: string;
}

// Get all prizes
export const getPrizes = (): Promise<Prize[]> => {
  return fetcher<Prize[]>("/prizes");
};

// Create a new prize
export const createPrize = (data: PrizeFormData): Promise<Prize> => {
  // Transform the form data to match backend structure (let backend generate organization ID)
  const payload = {
    name: data.name,
    description: data.description,
    premiationDate: data.premiationDate,
    organization: {
      name: data.organizationName,
      tipo: data.organizationType
    }
  };
  
  console.log("🏆 [PRIZE SERVICE] Making POST to /prizes with payload:", JSON.stringify(payload, null, 2));
  
  const result = fetcher<Prize>("/prizes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  
  console.log("🏆 [PRIZE SERVICE] POST request sent to /prizes");
  return result;
};

// Create a prize and associate it with an author
export const createPrizeWithAuthor = async (data: PrizeFormData, authorId: number): Promise<Prize> => {
  console.log("🏆 [PRIZE SERVICE] createPrizeWithAuthor called with:", { data, authorId });
  
  // Validate required fields
  if (!authorId || authorId <= 0) {
    throw new Error("Invalid author ID provided");
  }
  
  if (!data.name?.trim()) {
    throw new Error("Prize name is required");
  }
  
  if (!data.description?.trim()) {
    throw new Error("Prize description is required");
  }
  
  if (!data.premiationDate?.trim()) {
    throw new Error("Premiation date is required");
  }
  
  if (!data.organizationName?.trim()) {
    throw new Error("Organization name is required");
  }
  
  if (!data.organizationType?.trim()) {
    throw new Error("Organization type is required");
  }
  

  
  // Step 1: Create the prize
  const createdPrize = await createPrize(data);
  
  // Step 2: Associate the prize with the author
  await associatePrizeWithAuthor(createdPrize.id, authorId);
  
  return createdPrize;
};

// Associate a prize with an author
export const associatePrizeWithAuthor = (prizeId: number, authorId: number): Promise<void> => {
  console.log(`🏆 [PRIZE SERVICE] Making POST to /prizes/${prizeId}/author/${authorId} for association`);
  
  const result = fetcher<void>(`/prizes/${prizeId}/author/${authorId}`, {
    method: "POST",
  });
  
  console.log(`🏆 [PRIZE SERVICE] POST request sent to /prizes/${prizeId}/author/${authorId}`);
  return result;
};