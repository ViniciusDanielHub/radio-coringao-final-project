"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";

export function NewsletterForm() {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-6">
      <div className="mb-stack-sm flex items-center gap-2">
        <Circle size={8} className="fill-secondary text-secondary" />
        <h2 className="font-headline-md text-headline-md text-primary">
          Fique por dentro
        </h2>
      </div>
      <p className="mb-stack-md font-body-md text-body-md text-on-surface-variant">
        Receba as principais notícias do Timão direto no seu email.
      </p>

      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full border-b-2 border-primary bg-transparent px-0 py-2 font-body-md text-body-md text-primary placeholder:text-on-surface-variant focus:border-secondary focus:outline-none"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Seu melhor email"
            className="w-full border-b-2 border-primary bg-transparent px-0 py-2 font-body-md text-body-md text-primary placeholder:text-on-surface-variant focus:border-secondary focus:outline-none"
          />
        </div>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-sm bg-primary py-3 font-label-sm text-label-sm uppercase text-on-primary transition-colors duration-200 hover:bg-secondary"
        >
          Inscrever-se
        </motion.button>
      </form>
    </div>
  );
}