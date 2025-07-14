// Image upload utilities and helpers

export interface UploadedImage {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported. Please use JPEG, PNG, or WebP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size too large. Maximum size is 10MB.' };
  }

  return { valid: true };
};

export const resizeImage = (file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, file.type, quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

export const generateThumbnail = (file: File, size: number = 300): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;

      const scale = Math.max(size / img.width, size / img.height);
      const x = (size - img.width * scale) / 2;
      const y = (size - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      resolve(canvas.toDataURL());
    };

    img.src = URL.createObjectURL(file);
  });
};

// Mock upload function - replace with actual API call
export const uploadToServer = async (file: File): Promise<UploadedImage> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real implementation, you would:
  // 1. Upload to your server or cloud storage (AWS S3, Cloudinary, etc.)
  // 2. Return the actual URL and metadata

  return {
    id: Date.now().toString(),
    url: URL.createObjectURL(file),
    filename: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString()
  };
};

// Cloud storage configuration examples
export const cloudinaryConfig = {
  cloudName: 'dneycg7mk',
  uploadPreset: 'cabrera_photos',
  folder: 'cabrera-gallery'
};

export const uploadToCloudinary = async (file: File, category: string): Promise<UploadedImage & { category: string }> => {
  const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', `${cloudinaryConfig.folder}/${category}`);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to Cloudinary');
  }

  const data = await response.json();

  return {
    id: data.asset_id || data.public_id,
    url: data.secure_url,
    filename: data.original_filename,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
    category
  };
};

// In browser console:
