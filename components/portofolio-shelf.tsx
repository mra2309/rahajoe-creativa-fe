"use client";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useProducts } from "@/hooks/use-product";
import { PortfolioWork } from "@/types/product";

export function PortofolioShelf() {
  const {
    data: productsData,
    isLoading: isProductsLoading,
    error,
  } = useProducts();
  const [displayedWorks, setDisplayedWorks] = useState<PortfolioWork[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newItemsLoaded, setNewItemsLoaded] = useState(false);

  // Transform products data to match the expected format and sort by position
  const portfolioWorks = useMemo((): PortfolioWork[] => {
    if (!productsData?.data) return [];
    return productsData.data
      .sort((a, b) => a.position - b.position) // Sort by position ascending
      .map((product, index) => ({
        src: product.logo_url,
        alt: product.name || `portfolio-${index + 1}`,
        id: product.id,
        position: product.position,
      }));
  }, [productsData]);

  // Initialize displayed works when products are loaded
  useEffect(() => {
    if (portfolioWorks.length > 0 && displayedWorks.length === 0) {
      setDisplayedWorks(portfolioWorks.slice(0, 16));
      setCurrentIndex(0);
    }
  }, [portfolioWorks, displayedWorks.length]);

  const loadMoreWorks = async () => {
    setIsLoadingMore(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const nextWorks = portfolioWorks.slice(
      currentIndex + 16,
      currentIndex + 32
    );

    if (nextWorks.length > 0) {
      setDisplayedWorks((prev) => [...prev, ...nextWorks]);
      setCurrentIndex((prev) => prev + 16);
      setNewItemsLoaded(true);

      // Reset new items animation after a short delay
      setTimeout(() => setNewItemsLoaded(false), 1000);
    }

    setIsLoadingMore(false);
  };

  // Show loading state when products are being fetched
  if (isProductsLoading) {
    return (
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="relative aspect-square w-full bg-gray-200 animate-pulse rounded-[25px] md:rounded-[50px]"
          />
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20">
        <p className="text-red-500 text-lg">Failed to load portfolio works</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-[#FFC5EB] py-2 px-6 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
        {displayedWorks.map((work, index) => {
          const isNewItem = index >= 16 && newItemsLoaded;
          return (
            <div
              key={work.id || index}
              className={`relative aspect-square w-full transition-all duration-500 ${
                isNewItem ? "animate-fadeIn" : ""
              }`}
            >
              <Image
                draggable="false"
                src={work.src}
                alt={work.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover rounded-[25px] md:rounded-[50px]"
                priority={index < 8}
                loading={index < 8 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmOWZhZmIiIHN0b3Atb3BhY2l0eT0iMC45Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2Y5ZmFmYiIgc3RvcC1vcGFjaXR5PSIwLjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNnKSIgcng9IjUwIi8+PC9zdmc+"
                quality={75}
                unoptimized={work.src.includes(".gif")}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
        {currentIndex + 16 < portfolioWorks.length ? (
          <button
            onClick={loadMoreWorks}
            disabled={isLoadingMore}
            className="bg-[#FFC5EB] cursor-pointer py-3 px-14 mt-3 max-w-max text-sm md:text-3xl rounded-[14px] md:rounded-[20px] font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoadingMore ? "LOADING..." : "SEE MORE"}
          </button>
        ) : (
          <div className="text-gray-500 text-xl font-medium">
            All caught up!
          </div>
        )}
      </div>
    </>
  );
}
