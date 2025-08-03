import Image from "next/image";
import { TalkForm } from "@/components/form/talk-form";

export function LetsTalkSection() {
  return (
    <section id="talk" className="bg-[#F8F8F8] py-12 md:py-40">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20 px-5 md:px-0">
        <div className="flex flex-col order-2 md:order-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-16">
            Let&apos;s Talk
          </h1>
          <p className="text-sm md:text-2xl font-light leading-5 tracking-wide md:leading-10">
            Connect with us and create stunning logo designs that boost your
            business. Or if you have any questions or concerns, or simply say
            hello.
          </p>
          <TalkForm />
        </div>
        <div className="bg-white p-15 md:p-20 rounded-[85px] md:rounded-[100px] max-w-max md:mt-10 mx-auto order-1 md:order-2">
          <Image
            draggable="false"
            src="/icon/form-icon.svg"
            alt="Contact form illustration"
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+"
            loading="lazy"
            sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 300px"
            className="w-56 h-56 sm:w-64 sm:h-64 md:w-full md:h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
