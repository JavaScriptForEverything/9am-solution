import { ORIGIN } from "@/lib/config"

const API_BASE_URL = ORIGIN

interface ApiResponse<T> {
  status: string
  message: string
  data: T
  count: number
  total: number
}

export const apiRequest = async <T>( endpoint: string, method: string = "GET", body?: unknown): Promise<ApiResponse<T>> => {
  const authToken = localStorage.getItem("authToken") || ""

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", 
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
  const result: ApiResponse<T> = await response.json()

  return result
}
