import Image from "next/image";
import Link from "next/link";

export function StickyLink() {
  return (
    <section className="w-full fixed bottom-0 left-0 right-0 bg-[#FFF988] px-4 flex py-5 md:py-2 items-center justify-center gap-2 md:gap-10 z-40">
      <div className="relative w-16 h-8 md:w-16 md:h-16">
        <Image
          draggable="false"
          src="/icon/backhand-left.png"
          alt="Pointing hand gesture left"
          fill
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0ZGRjk4OCIvPjwvc3ZnPg=="
          loading="lazy"
          sizes="(max-width: 768px) 64px, 80px"
          style={{ objectFit: "contain" }}
        />
      </div>
      <Link
        href="/questionnaire"
        className="text-md md:text-4xl text-center font-bold"
      >
        CREATE YOUR LOGO NOW AND GET 10% OFF!
      </Link>
      <div className="relative w-16 h-8 md:w-16 md:h-16">
        <Image
          draggable="false"
          src="/icon/backhand-right.png"
          alt="Pointing hand gesture right"
          fill
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0ZGRjk4OCIvPjwvc3ZnPg=="
          loading="lazy"
          sizes="(max-width: 768px) 64px, 80px"
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
}
