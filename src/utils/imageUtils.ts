// Utility functions for handling images

// Local assets mapping for common external URLs
const localAssetMap: Record<string, string> = {
  // Map common external URLs to local assets
  'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800': '/src/assets/photo1.jpeg',
  'https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=800': '/src/assets/photo2.jpeg',
  'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=400': '/src/assets/photo1.jpeg',
  'https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=400': '/src/assets/photo2.jpeg',
  'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1920': '/src/assets/photo1.jpeg',
};

// Check if an image URL is external
export const isExternalImage = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

// Get a local asset URL if available, otherwise return the original URL
export const getImageUrl = (url: string): string => {
  if (localAssetMap[url]) {
    return localAssetMap[url];
  }
  return url;
};

// Generate a placeholder text based on the image context
export const getPlaceholderText = (alt: string, category?: string): string => {
  if (category) {
    return `${category} Image`;
  }
  if (alt) {
    return alt.length > 20 ? `${alt.substring(0, 20)}...` : alt;
  }
  return 'Image';
};

// Validate if an image URL is likely to work
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  if (url.startsWith('/')) return true; // Local path
  if (url.startsWith('data:')) return true; // Data URL
  if (url.startsWith('blob:')) return true; // Blob URL
  if (isExternalImage(url)) return true; // External URL
  return false;
}; 