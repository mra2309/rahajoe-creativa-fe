"use client";

import NextLink from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  "aria-label"?: string;
  [key: string]: unknown; // Allow other props
}

export const TransitionLink = ({
  href,
  children,
  className,
  onClick,
  target,
  ...props
}: TransitionLinkProps) => {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if it's a same-page anchor link (starts with #)
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    // Check if it's the same path with anchor (e.g., /page#section)
    else if (href.includes("#")) {
      const [linkPath, anchor] = href.split("#");
      if (linkPath === pathname || linkPath === "") {
        e.preventDefault();
        const targetElement = document.querySelector(`#${anchor}`);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }

    // Call the original onClick if provided
    onClick?.(e);
  };

  return (
    <NextLink
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      {...props}
    >
      {children}
    </NextLink>
  );
};
