"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { PortofolioShelf } from "@/components/portofolio-shelf";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ClientShelf from "../client-shelf";

function Counter({ from, to }: { from: number; to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayValue = useTransform(rounded, (latest) =>
    latest >= 999 ? "999+" : latest.toString()
  );
  const ref = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    }
  }, [count, to, isInView]);

  useEffect(() => {
    return displayValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest;
      }
    });
  }, [displayValue]);

  return (
    <span ref={counterRef}>
      <span ref={ref}>{from}</span>
    </span>
  );
}

export function BrandingSection() {
  return (
    <section className="bg-[#f8f8f8] py-12 md:py-40 px-6 space-y-12 md:space-y-40">
      <div className="space-y-16 md:space-y-28">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-4xl max-w-sm md:max-w-full font-bold text-left md:leading-12">
            We are a logo design agency based in Indonesia that specializes in
            creating custom logo designs for businesses that dare to stand out.
          </h1>
        </div>
        <div className="max-w-5xl mx-auto grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
          <div className="rounded-[85px]">
            <Image
              draggable="false"
              src="/brand/omelet-game-studio.gif"
              alt="Omelet Game Studio animated logo showcase"
              width={646}
              height={647}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQ2IiBoZWlnaHQ9IjY0NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGl4ZWwiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZjhmOGY4Ii8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSI3IiB5PSI3IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZThlOGU4Ii8+PHJlY3QgeD0iMjIiIHk9IjIyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZThlOGU4Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BpeGVsKSIvPjwvc3ZnPg=="
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 646px"
              priority={false}
              loading="lazy"
              unoptimized
              className="rounded-[85px] w-full h-auto object-cover"
            />
          </div>
          <p className="text-sm md:text-xl font-light md:font-normal tracking-wide leading-7 md:leading-10">
            Behind every business is an incredible story waiting to be told that
            deserves to be visualized. Combining your branding purpose with our
            experience, we elevate your brand, captivate your audience, and
            create a visual impact. We aim to help your brand stand out, thrive,
            and compete.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-32">
          <p className="text-sm md:text-xl font-light md:font-normal tracking-wide leading-7 md:leading-10 order-2">
            Our approach begins with an understanding of your brand and digging
            deep to uncover your brand’s story, values, target audiences,
            uniqueness, etc. Then we visualize a powerful and stunning logo
            design. Our mission is to provide more than just a logo, we offer a
            distinctive visual mark.
          </p>
          <div className="order-1 md:order-2">
            <Image
              draggable="false"
              src="/icon/whale-icon.png"
              alt="Brand storytelling and visual identity icon"
              width={646}
              height={647}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQ2IiBoZWlnaHQ9IjY0NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGl4ZWwiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+PHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZjhmOGY4Ii8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSI3IiB5PSI3IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZThlOGU4Ii8+PHJlY3QgeD0iMjIiIHk9IjIyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZThlOGU4Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BpeGVsKSIvPjwvc3ZnPg=="
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 646px"
              loading="lazy"
              className="rounded-[50px] w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <div className="space-y-10 md:space-y-20">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="text-2xl max-w-sm md:max-w-3xl md:text-4xl font-bold">
            Proud to be part of <Counter from={0} to={999} /> of clients.
          </h1>
        </motion.div>
        <ClientShelf />
      </div>
      <div className="space-y-10 md:space-y-20">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold">How we work</h1>
        </motion.div>
        <div className="max-w-5xl mx-auto grid items-center grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <motion.div
            className="bg-[#D8DAFF] py-12 px-10 h-[350px] md:h-[425px] rounded-[85px] cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center my-4 md:my-10 justify-end">
              <Image
                draggable="false"
                src="/icon/note-pen.svg"
                alt="Design brief planning icon"
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0Q4REFGRiIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="40px"
              />
            </div>
            <div className="space-y-4">
              <h1 className="font-bold text-lg md:text-xl">
                Write a design brief
              </h1>
              <p className="font-normal text-base md:text-xl tracking-wide max-w-sm leading-6 md:leading-8">
                We&apos;ll ask you to fill out our questionnaire document that
                we use to explore your brand’s story, values, uniqueness, target
                audience, etc.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-[#FFC5EB] py-12 px-10 h-[350px] md:h-[425px] rounded-[85px] cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center my-5 md:my-10 justify-end">
              <Image
                draggable="false"
                src="/icon/pen.svg"
                alt="Design work in progress icon"
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0ZGQzVFQiIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="40px"
              />
            </div>
            <div className="space-y-4">
              <h1 className="font-bold text-lg md:text-xl">Work in progress</h1>
              <p className="font-normal text-base md:text-xl tracking-wide leading-6 md:leading-8">
                Our talented designers will work creatively and provide the
                proposal within the specified time.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-[#B5DDB0] py-12 px-10 h-[350px] md:h-[425px] rounded-[85px] cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center my-5 md:my-10 justify-end">
              <Image
                draggable="false"
                src="/icon/document-recycle.svg"
                alt="Revision and feedback icon"
                width={50}
                height={50}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0I1RERCMCIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="50px"
              />
            </div>
            <div className="space-y-4">
              <h1 className="font-bold text-lg md:text-xl">Revision round</h1>
              <p className="font-normal text-base md:text-xl tracking-wide leading-6 md:leading-8">
                Unlimited revisions are provided! Until a winning design is
                obtained.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-[#FFF988] py-12 px-10 h-[350px] md:h-[425px] rounded-[85px] cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-out"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center my-5 md:my-10 justify-end">
              <Image
                draggable="false"
                src="/icon/document-up.svg"
                alt="Final delivery and handoff icon"
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI0ZGRjk4OCIvPjwvc3ZnPg=="
                loading="lazy"
                sizes="40px"
              />
            </div>
            <div className="space-y-4">
              <h1 className="font-bold text-lg md:text-xl">Final touch</h1>
              <p className="font-normal text-base md:text-xl tracking-wide leading-6 md:leading-8">
                Submission of all original files, copyright transfer, and all
                required documents.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="space-y-10 md:space-y-20 scroll-mt-16 md:scroll-mt-40"
        id="works"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold">
            A bit of our past work
          </h1>
        </div>
        <PortofolioShelf />
      </div>
    </section>
  );
}
