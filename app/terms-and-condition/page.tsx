"use client";

import { Footer } from "@/components/footer";
import { TermsSkeleton } from "@/components/terms-skeleton";
import { useTerms } from "@/hooks/use-terms";

export default function Page() {
  const { data: termsData, isLoading, error } = useTerms();

  if (isLoading) {
    return (
      <>
        <TermsSkeleton />
        <Footer />
      </>
    );
  }

  if (error || !termsData?.data) {
    return (
      <>
        <section className="w-full bg-[#F8F8F8] h-auto pt-32 md:pt-52 pb-20 md:pb-40 space-y-5 px-5 md:px-0">
          <div className="max-w-5xl mx-auto pb-4 md:pb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              Terms & Conditions
            </h1>
          </div>
          <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white rounded-lg border border-zinc-200">
            <p className="text-red-500">
              Failed to load terms and conditions. Please try again later.
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Sort terms by position
  const sortedTerms = [...termsData.data].sort(
    (a, b) => a.position - b.position
  );

  return (
    <>
      <section className="w-full bg-[#F8F8F8] h-auto pt-32 md:pt-52 pb-20 md:pb-40 space-y-5 px-5 md:px-0">
        <div className="max-w-5xl mx-auto pb-4 md:pb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Terms & Conditions</h1>
        </div>

        {sortedTerms.map((term) => (
          <div
            key={term.id}
            className="max-w-5xl mx-auto space-y-2 md:space-y-4 p-6 md:p-8 bg-white rounded-lg border border-zinc-200"
          >
            <h1 className="font-semibold">{term.title}</h1>

            {term.description && (
              <p className="mb-2 text-sm md:text-base">{term.description}</p>
            )}

            {term.content.length > 0 && (
              <ul className="list-disc pl-4 space-y-2 text-sm md:text-base tracking-wide">
                {term.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
