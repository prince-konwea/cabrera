import { useState, useCallback } from 'react';
import { validateImageFile, uploadToServer, UploadedImage } from '../utils/imageUpload';

interface UseImageUploadReturn {
  uploading: boolean;
  uploadedImages: UploadedImage[];
  uploadProgress: number;
  error: string | null;
  uploadImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  clearImages: () => void;
}

export const useImageUpload = (): UseImageUploadReturn => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = useCallback(async (files: File[]) => {
    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const validFiles: File[] = [];
      
      // Validate all files first
      for (const file of files) {
        const validation = validateImageFile(file);
        if (!validation.valid) {
          throw new Error(validation.error);
        }
        validFiles.push(file);
      }

      const uploadPromises = validFiles.map(async (file, index) => {
        const uploadedImage = await uploadToServer(file);
        setUploadProgress(((index + 1) / validFiles.length) * 100);
        return uploadedImage;
      });

      const results = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...results]);
      setUploadProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const clearImages = useCallback(() => {
    setUploadedImages([]);
    setError(null);
    setUploadProgress(0);
  }, []);

  return {
    uploading,
    uploadedImages,
    uploadProgress,
    error,
    uploadImages,
    removeImage,
    clearImages
  };
};