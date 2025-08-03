import { HeroSection } from "@/components/section/hero-section";
import { ReviewsSection } from "@/components/section/reviews";
import { BrandingSection } from "@/components/section/branding";
import { LetsTalkSection } from "@/components/section/lets-talk";
import { Footer } from "@/components/footer";
import { StickyLink } from "@/components/sticky-link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <BrandingSection />
      <ReviewsSection />
      <LetsTalkSection />
      <Footer />
      <StickyLink />
    </main>
  );
}
