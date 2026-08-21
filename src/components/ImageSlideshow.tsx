import { useState, useEffect, useCallback, type ReactNode } from "react";

interface SlideshowProps {
  images: string[];
  alt: string;
  autoPlayInterval?: number;
  firstSlideDuration?: number;
  className?: string;
  imageClassName?: string;
  showDots?: boolean;
  dotsPosition?: string;
  children?: ReactNode;
}

export function ImageSlideshow({
  images,
  alt,
  autoPlayInterval = 5000,
  firstSlideDuration = 10000,
  className = "relative h-[62vh] min-h-[420px] w-full overflow-hidden",
  imageClassName = "object-cover object-center",
  showDots = true,
  dotsPosition = "bottom-6 left-1/2 -translate-x-1/2",
  children,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setPrevIndex(currentIndex);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 50);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1050);
  }, [currentIndex, isTransitioning, images.length]);

  // Dynamic auto-play timer: 10 seconds for the 1st photo, 5 seconds for others
  useEffect(() => {
    const currentDuration = currentIndex === 0 ? firstSlideDuration : autoPlayInterval;
    const timer = setTimeout(goToNext, currentDuration);
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext, autoPlayInterval, firstSlideDuration]);

  return (
    <div className={className}>
      {/* Previous Image (fading out) */}
      <img
        key={`prev-${prevIndex}`}
        src={images[prevIndex]}
        alt={`${alt} - Image ${prevIndex + 1}`}
        width={1600}
        height={1008}
        className={`absolute inset-0 h-full w-full ${imageClassName} transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Current Image (fading in with subtle zoom) */}
      <img
        key={`curr-${currentIndex}`}
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        width={1600}
        height={1008}
        className={`absolute inset-0 h-full w-full ${imageClassName} transition-all duration-1000 ease-in-out ${
          isTransitioning ? "opacity-100 scale-100" : "opacity-100 scale-[1.03]"
        }`}
        style={{
          transitionProperty: "opacity, transform",
          transitionDuration: isTransitioning ? "1000ms" : `${currentIndex === 0 ? firstSlideDuration : autoPlayInterval}ms`,
        }}
      />

      {children}

      {/* Dots Indicator */}
      {showDots && (
        <div className={`absolute z-20 ${dotsPosition} flex items-center gap-2`}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning && index !== currentIndex) {
                  setIsTransitioning(true);
                  setPrevIndex(currentIndex);

                  setTimeout(() => {
                    setCurrentIndex(index);
                  }, 50);

                  setTimeout(() => {
                    setIsTransitioning(false);
                  }, 1050);
                }
              }}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 bg-white shadow-lg shadow-black/20"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}


