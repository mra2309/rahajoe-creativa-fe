export function ReviewsSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="flex">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-4"
          >
            <div className="flex gap-6 sm:gap-8 md:gap-14 items-start max-w-4xl mx-auto">
              {/* Quote icon skeleton */}
              <div className="mt-2 w-6 h-6 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px] flex-shrink-0 bg-gray-200 rounded-md animate-pulse"></div>

              <div className="space-y-4 sm:space-y-6 flex-1">
                {/* Message skeleton */}
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 md:h-5 lg:h-6 bg-gray-200 rounded max-w-xs md:max-w-lg"></div>
                  <div className="h-4 md:h-5 lg:h-6 bg-gray-200 rounded max-w-sm md:max-w-md"></div>
                  <div className="h-4 md:h-5 lg:h-6 bg-gray-200 rounded max-w-xs md:max-w-sm"></div>
                  <div className="h-4 md:h-5 lg:h-6 bg-gray-200 rounded max-w-2xs md:max-w-xs"></div>
                </div>

                {/* Name skeleton */}
                <div className="h-5 md:h-6 lg:h-7 bg-gray-200 rounded max-w-32 md:max-w-40 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
