"use client";

import { motion } from "framer-motion";

export function AdvertiseContent() {
  return (
    <div className="mx-auto w-full max-w-4xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary md:text-headline-lg">
          Anuncie Conosco
        </h1>

        <div className="space-y-8">
          <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <h2 className="mb-4 font-headline-md text-headline-md text-primary">
              Por que anunciar no Rádio Coringão?
            </h2>
            <p className="mb-4 font-body-md text-on-surface-variant">
              O Rádio Coringão é o maior portal de notícias do Corinthians, com milhares de访问as diárias
              de torcedores fiéis. Sua marca terá visibilidade junto ao público mais apaixonado do futebol brasileiro.
            </p>
            <ul className="list-inside list-disc space-y-2 font-body-md text-on-surface-variant">
              <li>Mais de 500 mil访问as mensais</li>
              <li>Público engajado e fiel ao Corinthians</li>
              <li>Segmentação por categorias de interesse</li>
              <li>Relatórios de performance detalhados</li>
            </ul>
          </section>

          <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <h2 className="mb-4 font-headline-md text-headline-md text-primary">
              Entre em Contato
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary">email</span>
                <span className="font-body-md text-primary font-bold">radioncoringaocontato@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-secondary">phone</span>
                <span className="font-body-md text-primary font-bold">(11) 99999-9999</span>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
