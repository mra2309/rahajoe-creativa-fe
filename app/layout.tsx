import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { QueryProvider } from "@/providers/query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://rahajoe-creativa-ui.vercel.app"
      : "http://localhost:3000"
  ),
  title: "RAHAJOE CREATIVA",
  description:
    "a brand identity designer who will help visualize your brand values.",
  openGraph: {
    images: [
      {
        url: "https://5j7mf0yiax.ufs.sh/f/jFnBChf9wAfEHRvB8U2GzkM5wuLROqFndPBTlmNUc2ob0vEJ",
        width: 1738,
        height: 974,
        alt: "RAHAJOE CREATIVA - Brand Identity Designer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-14 md:scroll-pt-0">
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <Header />
          {children}
          {/* <PageTransition>{children}</PageTransition> */}
        </QueryProvider>
      </body>
    </html>
  );
}
