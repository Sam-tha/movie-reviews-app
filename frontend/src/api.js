const API_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? "" : "http://localhost:8000")
).replace(/\/+$/, "");

export const MOVIES_URL = `${API_URL}/movies`;