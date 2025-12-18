import React, { useState } from "react";

type CustomImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  showSkeleton?: boolean;
  imageClassName?: string;
};

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fallbackSrc = "/images/fallback.png",
  showSkeleton = true,
  className = "",
  imageClassName,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      <img
        {...rest}
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          duration-300 ease-out
          ${isLoading ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"}
          ${imageClassName ?? ""}
        `}
      />
    </div>
  );
};

export default CustomImage;
