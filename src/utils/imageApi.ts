import axios from 'axios';
// Image API utilities for backend integration

export interface ImageMeta {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: string;
  category?: string;
}

export async function uploadImage(file: File, category?: string): Promise<ImageMeta> {
  const formData = new FormData();
  formData.append('file', file);
  if (category) formData.append('category', category);
  const response = await fetch('/images/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Upload failed');
  return await response.json();
}

export async function fetchImages(params: { category?: string; limit?: number; offset?: number } = {}): Promise<ImageMeta[]> {
  const search = new URLSearchParams();
  if (params.category) search.append('category', params.category);
  if (params.limit) search.append('limit', params.limit.toString());
  if (params.offset) search.append('offset', params.offset.toString());
  const response = await fetch(`/images?${search.toString()}`);
  if (!response.ok) throw new Error('Fetch failed');
  return await response.json();
}

// Axios instance for API requests
// Set VITE_API_BASE_URL in your .env file, e.g. VITE_API_BASE_URL=http://localhost:9091
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product type for backend
export interface ProductPayload {
  title: string;
  description: string;
  imageUrls: string[];
  category: string;
  price: number;
}

// Create a new product
export async function createProduct(product: ProductPayload) {
  const response = await api.post('/products', product);
  return response.data;
}

// Update a product
export async function updateProduct(id: string, product: ProductPayload) {
  const response = await api.patch(`/products/${id}`, product);
  return response.data;
}

// Delete a product
export async function deleteProduct(id: string) {
  const response = await api.delete(`/products/${id}`);
  return response.data;
} 