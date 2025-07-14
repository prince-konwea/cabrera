import React, { useState } from 'react';
import PlaceholderImage from './PlaceholderImage';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  onClick?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackText = 'Image',
  onClick
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (hasError) {
    return (
      <PlaceholderImage
        alt={alt}
        className={className}
        text={fallbackText}
        onClick={handleClick}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      onClick={handleClick}
    />
  );
};

export default ImageWithFallback; 