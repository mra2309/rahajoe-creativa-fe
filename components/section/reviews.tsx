import Image from "next/image";
import { Reviews } from "../reviews";
import Link from "next/link";

export function ReviewsSection() {
  return (
    <section className="w-full bg-[#D8DAFF] py-14 md:py-40 px-4 space-y-12 md:space-y-20">
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-20">
        <h1 className="text-2xl md:text-4xl font-bold text-left">
          The love we get!
        </h1>
        <Reviews />
        <Link
          href="https://maps.app.goo.gl/ZoMz7MCw2GAY54W56"
          target="_blank"
          className="flex justify-end mt-10"
        >
          <button className="font-bold text-sm md:text-2xl underline underline-offset-3 flex cursor-pointer items-center gap-3 md:gap-6 justify-end group">
            Read More
            <div className="transition-transform duration-300 group-hover:translate-x-2 relative w-4 h-4 md:w-7 md:h-7">
              <Image
                draggable="false"
                src="/icon/arrow-right.svg"
                alt="Arrow pointing right"
                fill
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjciIGhlaWdodD0iMjciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0Q4REFGRiIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="(max-width: 640px) 20px, (max-width: 768px) 24px, 28px"
                className="object-contain"
              />
            </div>
          </button>
        </Link>
      </div>
    </section>
  );
}
