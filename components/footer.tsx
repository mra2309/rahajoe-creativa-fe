import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white pt-14 pb-28 md:py-24 z-30">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start px-5 md:px-0 gap-10 md:gap-32">
        <div className="flex-shrink-0 relative w-9 h-9 sm:w-14 sm:h-14 md:w-[73px] md:h-[73px]">
          <Image
            draggable="false"
            src="/logo/footer-icon.svg"
            alt="Rahajoe Creativa brand logo"
            fill
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMiIGhlaWdodD0iNzMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFDMUMxQyIvPjwvc3ZnPg=="
            loading="lazy"
            sizes="(max-width: 480px) 40px, (max-width: 768px) 50px, (max-width: 1024px) 60px, 73px"
            className="object-contain"
          />
        </div>
        <div className="w-full flex flex-col md:flex-row items-start space-y-8 md:items-center justify-between">
          <div className="flex flex-col md:items-start space-y-4 md:space-y-10">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                RAHAJOE CREATIVA
              </h1>
              <p className="font-light text-sm md:text-base tracking-wide">
                Mark your brand values.
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base">Drop us a line at</p>
              <Link
                href="mailto:indahrahajoe@gmail.com"
                className="hover:underline text-sm md:text-base"
              >
                indahrahajoe@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-48">
            <Link
              href="https://www.instagram.com/rahajoe_creativa"
              target="_blank"
              className="hidden md:block"
            >
              <Image
                draggable="false"
                src="/icon/instagram-light.svg"
                alt="Follow us on Instagram"
                width={32}
                height={32}
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFDMUMxQyIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="32px"
              />
            </Link>
            <div className="flex">
              <p className="font-light text-xs md:text-base">
                @ RAHAJOE CREATIVA
              </p>
              <div className="border-l-1 border-zinc-300 mx-2"></div>
              <Link
                href="/terms-and-condition"
                className="text-xs md:text-base font-light"
              >
                TERMS & CONDITION
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
