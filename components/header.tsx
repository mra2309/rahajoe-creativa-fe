"use client";
import Image from "next/image";
import { TransitionLink } from "./transition-link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BackOnTop } from "./back-ontop";
import { motion } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [prevPathname, setPrevPathname] = useState<string>("");

  useEffect(() => {
    // Track first load
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);

  useEffect(() => {
    // Track pathname changes for header transitions
    if (pathname !== prevPathname && prevPathname !== "") {
      // Close mobile menu on navigation
      setIsMenuOpen(false);
    }
    setPrevPathname(pathname);
  }, [pathname, prevPathname]);

  const headerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const transition = {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    duration: 2.0,
  };

  // For first load, render without animation
  if (isFirstLoad) {
    return (
      <header className="bg-[#f8f8f8] fixed w-full top-0 z-50">
        <HeaderContent
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          pathname={pathname}
        />
      </header>
    );
  }

  return (
    <motion.header
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={headerVariants}
      transition={transition}
      className="bg-[#f8f8f8] fixed w-full top-0 z-50"
    >
      <HeaderContent
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        pathname={pathname}
      />
    </motion.header>
  );
}

function HeaderContent({
  isMenuOpen,
  setIsMenuOpen,
  pathname,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  pathname: string;
}) {
  return (
    <>
      <nav className="max-w-7xl mx-auto py-6 md:py-10 flex items-center justify-between px-5 md:px-0">
        <TransitionLink href="/" className="flex items-center">
          <Image
            draggable="false"
            src="/logo/nav-logo.svg"
            alt="Rahajoe Creativa brand logo"
            width={29}
            height={29}
            priority
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZjhmOCIvPjwvc3ZnPg=="
            sizes="29px"
          />
        </TransitionLink>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center h-10 space-y-1.5 cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-1 bg-black transition-all duration-300 ease-in-out"></div>
          <div className="w-6 h-1 bg-black transition-all duration-300 ease-in-out"></div>
          <div className="w-6 h-1 bg-black transition-all duration-300 ease-in-out"></div>
        </button>
        <nav
          className={`fixed top-0 left-0 h-full w-[300px] bg-[#f8f8f8] transform transition-transform duration-300 ease-in-out flex flex-col justify-center items-center space-y-8 z-50 md:hidden ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Mobile navigation menu"
        >
          {/* Logo */}
          <TransitionLink
            href="/"
            className="absolute top-28"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              draggable="false"
              src="/logo/nav-logo.svg"
              alt="Rahajoe Creativa brand logo"
              width={29}
              height={29}
              priority
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkiIGhlaWdodD0iMjkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZjhmOCIvPjwvc3ZnPg=="
              sizes="29px"
            />
          </TransitionLink>
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute bottom-16 cursor-pointer bg-black p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
            aria-label="Close navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <ul className="flex flex-col items-center space-y-7 md:space-y-10">
            <li>
              <TransitionLink
                href="/#works"
                className="hover:underline md:text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                OUR WORK
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                className="md:text-xl hover:underline font-medium cursor-pointer"
                href="https://www.logoground.com/designer.php?did=24707"
                target="_blank"
              >
                BUY A LOGO
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/#talk"
                className="hover:underline md:text-xl font-medium cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                LET&apos;S TALK
              </TransitionLink>
            </li>
            {pathname !== "/questionnaire" && (
              <li>
                <TransitionLink
                  className="bg-[#FFF988] py-3 px-6 font-semibold rounded-lg md:text-lg"
                  href="/questionnaire"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ORDER NOW!
                </TransitionLink>
              </li>
            )}
            <li>
              <TransitionLink
                href="https://www.instagram.com/rahajoe_creativa"
                target="_blank"
                onClick={() => setIsMenuOpen(false)}
                className="md:text-xl hover:underline font-medium cursor-pointer"
              >
                INSTAGRAM
              </TransitionLink>
            </li>
          </ul>
        </nav>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-14 font-[400] font-stretch-75%">
          <li>
            <TransitionLink href="/#works" className="hover:underline">
              OUR WORK
            </TransitionLink>
          </li>
          <li>
            <TransitionLink
              className="hover:underline cursor-pointer"
              target="_blank"
              href="https://www.logoground.com/designer.php?did=24707"
            >
              BUY A LOGO
            </TransitionLink>
          </li>
          <li>
            <TransitionLink href="/#talk" className="hover:underline">
              LET&apos;S TALK
            </TransitionLink>
          </li>
          {pathname !== "/questionnaire" && (
            <li>
              <TransitionLink
                className="bg-[#FFF988] py-2 px-4 font-semibold rounded-lg"
                href="/questionnaire"
              >
                ORDER NOW!
              </TransitionLink>
            </li>
          )}
          <li>
            <TransitionLink
              href="https://www.instagram.com/rahajoe_creativa"
              target="_blank"
            >
              <Image
                src="/icon/instagram.svg"
                alt="Follow us on Instagram"
                width={32}
                height={32}
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y4ZjhmOCIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="32px"
              />
            </TransitionLink>
          </li>
        </ul>
      </nav>
      <BackOnTop />
    </>
  );
}
