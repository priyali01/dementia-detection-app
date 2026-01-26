// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function request(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const config = {
    method: "GET",
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...options,
  };

  // Prevent body on GET
  if (config.method === "GET") {
    delete config.body;
  }

  try {
    const res = await fetch(url, config);

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const message = data?.message || res.statusText || "Request failed";
      throw new Error(message);
    }

    return data;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

export const api = {
  get: (path, options) => request(path, { ...(options || {}), method: "GET" }),
  post: (path, body, options) =>
    request(path, {
      ...(options || {}),
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (path, body, options) =>
    request(path, {
      ...(options || {}),
      method: "PUT",
      body: JSON.stringify(body),
    }),
  del: (path, options) =>
    request(path, { ...(options || {}), method: "DELETE" }),
};

export default api;
