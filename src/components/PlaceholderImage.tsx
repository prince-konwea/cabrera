import React from 'react';

interface PlaceholderImageProps {
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  text?: string;
  onClick?: () => void;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  alt,
  className = '',
  width = 400,
  height = 300,
  text = 'Image',
  onClick
}) => {
  return (
    <div
      className={`bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-medium cursor-pointer ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label={alt}
      onClick={onClick}
    >
      <div className="text-center">
        <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );
};

export default PlaceholderImage; 