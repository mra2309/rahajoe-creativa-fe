import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface UsePageTransitionReturn {
  isTransitioning: boolean;
}

export const usePageTransition = (): UsePageTransitionReturn => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState<string>("");

  useEffect(() => {
    // Only trigger transition on actual route changes, not scroll
    if (pathname !== prevPathname && prevPathname !== "") {
      setIsTransitioning(true);

      // Short transition duration focused on route change
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }

    setPrevPathname(pathname);
  }, [pathname, prevPathname]);

  return {
    isTransitioning,
  };
};
