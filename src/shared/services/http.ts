const API_BASE_URL = "http://127.0.0.1:8080/api";

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(
      errorInfo.detail ||
        `Request error: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}