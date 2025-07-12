import React from 'react';

interface ImageModalProps {
  open: boolean;
  image: string;
  alt?: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ open, image, alt, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-2 z-10"
          onClick={onClose}
          aria-label="Close image modal"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={image}
          alt={alt || ''}
          className="w-full h-auto max-h-[80vh] rounded-lg shadow-lg object-contain bg-white"
        />
      </div>
    </div>
  );
};

export default ImageModal; 