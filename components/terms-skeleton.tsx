export function TermsSkeleton() {
  // Predefined content patterns to avoid hydration issues
  const contentPatterns = [
    { itemCount: 3, widths: ["w-5/6", "w-4/5", "w-3/4"] },
    { itemCount: 2, widths: ["w-4/5", "w-5/6"] },
    { itemCount: 2, widths: ["w-3/4", "w-4/5"] },
    { itemCount: 3, widths: ["w-5/6", "w-3/4", "w-4/5"] },
    { itemCount: 0, widths: [] }, // For the last card with no content
  ];

  return (
    <div className="w-full bg-[#F8F8F8] h-auto pt-32 md:pt-52 pb-20 md:pb-40 space-y-5 px-5 md:px-0">
      <div className="max-w-5xl mx-auto pb-4 md:pb-8">
        <div className="h-8 md:h-9 bg-gray-200 rounded max-w-xs animate-pulse"></div>
      </div>

      {/* Skeleton cards */}
      {contentPatterns.map((pattern, index) => (
        <div
          key={index}
          className="max-w-5xl mx-auto space-y-2 md:space-y-4 p-6 md:p-8 bg-white rounded-lg border border-zinc-200"
        >
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded max-w-sm animate-pulse"></div>

          {/* Description skeleton (for specific cards) */}
          {index === 1 && (
            <div className="h-4 bg-gray-200 rounded max-w-md animate-pulse"></div>
          )}

          {/* Content list skeleton */}
          {pattern.itemCount > 0 && (
            <div className="space-y-2 pl-4">
              {pattern.widths.map((width, contentIndex) => (
                <div key={contentIndex} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1 space-y-1">
                    <div
                      className={`h-4 bg-gray-200 rounded animate-pulse ${width}`}
                    ></div>
                    {contentIndex === 0 && index < 2 && (
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
