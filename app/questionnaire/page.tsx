"use client";
import { Footer } from "@/components/footer";
import { QuestionnaireForm } from "@/components/form/questionnaire-form";
import { motion } from "framer-motion";

const fadeInVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Page() {
  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <section className="w-full bg-[#F8F8F8] h-auto pt-32 md:pt-52 pb-20 md:pb-40 space-y-5 px-5 md:px-0">
        <motion.div
          className="max-w-5xl mx-auto border-b border-zinc-200 pb-8 space-y-4 md:space-y-6"
          variants={fadeInVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-xl md:text-3xl font-bold"
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Please take a few minutes to fill out the questions below so we can
            understand your brand&apos;s values and uniqueness.
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg tracking-wide font-light"
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            The information and materials included or attached are confidential
            and we will keep them. We will not use, disseminate, distribute, or
            copy without permission.
          </motion.p>
        </motion.div>
        <motion.div
          className="max-w-5xl mx-auto space-y-5"
          variants={fadeInVariants}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <motion.p
            className="text-sm md:text-base text-red-500"
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            * indicate required questions
          </motion.p>
          <motion.div
            variants={fadeInVariants}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          >
            <QuestionnaireForm />
          </motion.div>
        </motion.div>
      </section>
      <motion.div
        variants={fadeInVariants}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
}
