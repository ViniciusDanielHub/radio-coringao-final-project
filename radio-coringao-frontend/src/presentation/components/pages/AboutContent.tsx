"use client";

import { motion } from "framer-motion";

export function AboutContent() {
  return (
    <div className="mx-auto w-full max-w-4xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary md:text-headline-lg">
          Quem Somos
        </h1>

        <div className="space-y-8">
          <section className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <h2 className="mb-4 font-headline-md text-headline-md text-primary">
              Nossa História
            </h2>
            <p className="mb-4 font-body-md leading-relaxed text-on-surface-variant">
              O Rádio Coringão nasceu em 2020 da paixão de um grupo de torcedores do Corinthians que
              acreditavam que o time merecia um portal de notícias independente, direto e de qualidade.
              Desde então, nos tornamos referência no jornalismo esportivo voltado para o Timão.
            </p>
            <p className="mb-4 font-body-md leading-relaxed text-on-surface-variant">
              Nossa equipe é formada por jornalistas experientes, apaixonados pelo Corinthians, que
              cobrem o clube em todas as categorias: futebol masculino, feminino, base, basquete e futsal.
              Trabalhamos com compromisso, ética e rapidez para entregar as notícias mais relevantes
              para a Fiel.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
