"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <>
      <section className="w-full bg-[#D8DAFF] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-10 md:gap-24">
          <motion.div
            className="flex flex-col gap-4 md:gap-8 text-center md:text-left order-2 md:order-1"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1
              className="text-4xl sm:text-3xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              We Mark Your Brand
            </motion.h1>
            <motion.p
              className="text-md sm:text-xl/relaxed max-w-md mx-auto md:mx-0 font-normal tracking-wide"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Stand out your brand with a valuable and impactful logo design. We
              are brand identity designers who will help mark your brand values
              in a simple visual.
            </motion.p>
          </motion.div>
          <motion.div
            className="bg-white p-15 md:p-20 rounded-[85px] md:rounded-[100px] max-w-max mt-10 mx-auto order-1 md:order-2"
            initial={{ opacity: 0, x: 0, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              draggable="false"
              src="/icon/sec-one-icon.png"
              alt="Brand identity design icon"
              width={546}
              height={547}
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ2IiBoZWlnaHQ9IjU0NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmZmZmYiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2ZhZmFmYSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="
              sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 546px"
              className="w-48 h-48 sm:w-80 sm:h-80 md:w-full md:h-full object-contain"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </section>
      <section className="w-full bg-[#FFC5EB] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-12 md:gap-28">
          <motion.div
            className="bg-[#ED3B47] p-15 md:p-20 rounded-[85px] md:rounded-[100px] max-w-max mx-auto md:mx-0"
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              draggable="false"
              src="/icon/sec-two-icon.png"
              alt="Brand values visualization icon"
              width={346}
              height={347}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQ2IiBoZWlnaHQ9IjI0NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGl4ZWwiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRUQzQjQ3Ii8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjU1NTZBIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNGNTU1NkEiLz48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjRkY3Qzg5Ii8+PHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjRkY3Qzg5Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BpeGVsKSIvPjwvc3ZnPg=="
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 246px"
              className="w-48 h-48 md:w-72 md:h-72  object-contain"
            />
          </motion.div>
          <motion.div
            className="flex flex-col gap-4 text-center md:text-left order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h1
              className="text-2xl md:text-4xl tracking-wider md:tracking-wide font-medium md:font-normal md:leading-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              We mark brands to be loved, memorable, understandable and to
              convey their values.
            </motion.h1>
          </motion.div>
        </div>
      </section>
      <section className="w-full bg-[#B5DDB0] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-12 md:gap-28">
          <motion.div
            className="flex flex-col gap-4 text-center md:text-left order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h1
              className="text-2xl md:text-4xl tracking-wider md:tracking-wide font-medium md:font-normal md:leading-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              We offer logos that are stand out, distinctive, strong, iconic and
              impactful.
            </motion.h1>
          </motion.div>
          <motion.div
            className="bg-[#113A34] p-15 md:p-16 rounded-[85px] md:rounded-[100px] mx-auto max-w-max order-1 md:order-2"
            initial={{ opacity: 0, x: 50, y: -50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              draggable="false"
              src="/icon/sec-three-icon.png"
              alt="Distinctive logo design icon"
              width={546}
              height={547}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ2IiBoZWlnaHQ9IjM0NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGl4ZWwiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMTEzQTM0Ii8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMTk1MDQ3Ii8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMxOTUwNDciLz48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjI2QzVGIi8+PHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjI2QzVGIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BpeGVsKSIvPjwvc3ZnPg=="
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 346px"
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-full md:h-full object-contain"
            />
          </motion.div>
        </div>
      </section>
      <section className="w-full bg-[#FFF988] min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-12 md:gap-28">
          <motion.div
            className="bg-[#FFFFFF] p-16 md:p-20 rounded-[85px] md:rounded-[100px] max-w-max order-2 mx-auto md:order-1"
            initial={{ opacity: 0, x: -50, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              draggable="false"
              src="/icon/sec-four-icon.png"
              alt="Innovative design approach icon"
              width={546}
              height={547}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQ2IiBoZWlnaHQ9IjM0NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGl4ZWwiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkFGQUZBIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNGQUZBRkEiLz48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjRjVGNUY1Ii8+PHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjRjVGNUY1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BpeGVsKSIvPjwvc3ZnPg=="
              sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 346px"
              className="w-48 h-48 sm:w-72 sm:h-72 object-contain"
            />
          </motion.div>
          <motion.div
            className="flex flex-col gap-4 text-center md:text-left order-2 md:order-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h1
              className="text-2xl md:text-4xl tracking-wider md:tracking-wide font-medium md:font-normal md:leading-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              We think simply, break the rules, and are innovative.
            </motion.h1>
          </motion.div>
        </div>
      </section>
    </>
  );
}
