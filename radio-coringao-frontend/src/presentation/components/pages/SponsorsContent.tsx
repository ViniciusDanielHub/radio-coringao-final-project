"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Sponsor } from "@/app/patrocinadores/page";

interface SponsorsContentProps {
  sponsors: Sponsor[];
}

export function SponsorsContent({ sponsors }: SponsorsContentProps) {
  const activeSponsors = sponsors.filter((s) => s.isActive);

  return (
    <div className="mx-auto w-full max-w-7xl px-margin-mobile py-stack-lg md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary md:text-headline-lg">
            Patrocinadores
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Empresas que acreditam no projeto e apoiam a Rádio Coringão.
          </p>
        </div>

        {activeSponsors.length === 0 ? (
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-12 text-center">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Nenhum patrocinador encontrado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {activeSponsors.map((sponsor) => {
              const isClickable = !!sponsor.websiteUrl;
              const Wrapper = isClickable ? "a" : "div";
              const wrapperProps = isClickable
                ? {
                    href: sponsor.websiteUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {};

              return (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`group flex h-full flex-col items-center gap-4 rounded-lg border bg-surface-container-lowest p-6 transition-all ${
                      isClickable
                        ? "cursor-pointer border-outline-variant hover:border-primary hover:shadow-md"
                        : "border-outline-variant"
                    }`}
                  >
                    <div className="flex h-24 w-full items-center justify-center overflow-hidden">
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className={`max-h-full max-w-full object-contain ${
                          isClickable
                            ? "transition-transform duration-300 group-hover:scale-105"
                            : ""
                        }`}
                      />
                    </div>
                    <span className="text-center font-body-sm text-body-sm font-semibold text-on-surface">
                      {sponsor.name}
                    </span>
                    {sponsor.description && (
                      <p className="text-center font-body-xs text-body-xs text-on-surface-variant line-clamp-2">
                        {sponsor.description}
                      </p>
                    )}
                    {isClickable && (
                      <span className="mt-auto flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Visitar site <ExternalLink size={12} />
                      </span>
                    )}
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
