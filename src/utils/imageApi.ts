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