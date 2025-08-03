"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReviews } from "@/hooks/use-reviews";
import { ReviewsSkeleton } from "./reviews-skeleton";
import { Review } from "@/types/review";

const client_reviews: Review[] = [
  {
    message:
      "They were very easy to work with and came back with an incredible design. I'm selfishly worried more people will discover them, and they'll raise prices. But honestly, this is the best money I've spent on this project. They aren't cheap but it's worth every penny.",
    name: "Janosch",
  },
  {
    message:
      "It’s always a pleasure, and I consistently find myself thrilled with the great quality of their work! I wholeheartedly recommend them to anyone seeking high quality graphic design services at a remarkably affordable cost. ",
    name: "Tim",
  },
  {
    message:
      "Very professional, responsive and quick working with RAHAJOE - made the whole process really easy. The customer service was brilliant. Very pleased with the design. ",
    name: "Jake at Silvasheep",
  },
  {
    message:
      "Rahajoe is incredibly fast and high quality. He's great at listening to feedback and trying new ideas, taking a potentially nebulous logo idea and turning it into a brand image that can be used for a very long time. His turnaround times are incredibly fast, both on drafts and revisions. ",
    name: "Sydney Liu",
  },
  {
    message:
      "This is the 5th time our organization has worked with RAHAJOE and we could not be more pleased. Her incredible design skills are only surpassed by her kindness and great communication. Highly recommend! ",
    name: "Stave Salayda",
  },
  {
    message:
      "From a napkin idea to reality! Thank you so much for all your hard work! You really made a HAPPY logo for our team, between the font and the smirk- you opened a different perspective! We are so thankful for your originality and your vision!",
    name: "Madelyne Salo",
  },
];

export function Reviews() {
  const { data, isLoading, error } = useReviews();

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  // Show skeleton while loading
  if (isLoading) {
    return <ReviewsSkeleton />;
  }

  // Use fetched data if available, otherwise fallback to static data
  const reviews = data?.data || client_reviews;

  // Show error state with fallback data
  if (error) {
    console.warn("Failed to fetch reviews, using fallback data:", error);
  }

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 cursor-grab px-4"
          >
            <div className="flex gap-6 sm:gap-8 md:gap-14 items-start max-w-4xl mx-auto">
              <Image
                src="/icon/quotation-icon.svg"
                alt="Customer testimonial quote icon"
                width={50}
                height={50}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0Q4REFGRiIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 50px"
                className="mt-2 w-6 h-6 md:w-12 md:h-12 lg:w-[50px] lg:h-[50px] flex-shrink-0"
              />
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base max-w-xs md:text-lg lg:text-xl font-normal tracking-wide leading-8 lg:leading-10">
                  {review.message}
                </p>
                <p className="text-md sm:text-base md:text-lg lg:text-xl font-semibold">
                  - {review.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
