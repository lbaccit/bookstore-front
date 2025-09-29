const DEFAULT_API = "http://127.0.0.1:8080/api";


const API_BASE_URL = (
  process.env.NEXT_PUBLIC_DOCKER_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  DEFAULT_API
).replace(/\/$/, "");


export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  console.log("Making API request:", {
    url,
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: options?.body
  });

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let errorInfo: Record<string, unknown> = {};
    let responseText = "";
    
    try {
      responseText = await response.text();
      if (responseText) {
        errorInfo = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.warn("error message:", parseError);
    }
    
    console.error("error mesage", {
      status: response.status,
      statusText: response.statusText,
      responseText,
      errorInfo,
      url
    });
    
    console.error("error message:", responseText);
    console.error("error message:", JSON.stringify(errorInfo, null, 2));
    
    const errorMessage = 
      (typeof errorInfo.detail === 'string' ? errorInfo.detail : '') ||
      (typeof errorInfo.message === 'string' ? errorInfo.message : '') ||
      (errorInfo.errors ? JSON.stringify(errorInfo.errors) : '') ||
      responseText ||
      `Request error: ${response.status} ${response.statusText}`;
    
    console.error("Error message:", errorMessage);
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}