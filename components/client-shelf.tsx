"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useClients } from "@/hooks/use-client";
import { useState } from "react";

export default function ClientShelf() {
  const { data: clientsData, isLoading } = useClients();

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className="relative w-36 md:w-52 h-20 bg-gray-200 animate-pulse rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const clients = clientsData?.data || [];

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        className="w-full grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {clients.map((client, index) => {
          const justifyClass =
            index % 3 === 0
              ? "md:justify-start"
              : index % 3 === 1
              ? "justify-center"
              : "md:justify-end";

          return (
            <motion.div
              key={client.id || index}
              className={`w-full flex items-center justify-center ${justifyClass}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative w-36 md:w-52 h-20">
                <Image
                  draggable="false"
                  src={client.logo_url}
                  alt={`${client.name} client logo`}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmOGY4ZjgiLz48L3N2Zz4="
                  loading="lazy"
                  sizes="(max-width: 768px) 150px, 208px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
