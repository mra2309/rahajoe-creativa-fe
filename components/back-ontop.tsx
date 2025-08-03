"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export function BackOnTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down more than 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 md:bottom-auto md:top-36 right-2 md:right-16 z-50 cursor-pointer p-3 transition-all duration-500 ease-in-out hover:scale-110 ${
        isVisible
          ? "opacity-100 translate-y-0 md:block"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <Image
        src="/icon/arrow-up.svg"
        alt="Arrow Up"
        width={28}
        height={28}
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
      />
    </button>
  );
}
