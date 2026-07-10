"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NewsArticle } from "@/domain/entities";

interface TopStoriesProps {
  stories: NewsArticle[];
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export function TopStories({ stories }: TopStoriesProps) {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-4">
      <h2 className="mb-stack-md border-l-4 border-secondary pl-2 font-headline-md text-headline-md text-primary">
        Mais Lidas
      </h2>
      <motion.div
        className="flex flex-col"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {stories.map((story, index) => (
          <motion.div key={story.id} variants={item}>
            <Link
              href={`/noticias/${story.slug}`}
              className={`group flex items-start gap-4 py-3 ${
                index < stories.length - 1 ? "hairline-divider" : ""
              }`}
            >
              <span className="mt-[-4px] font-headline-md text-headline-md font-bold text-outline">
                {index + 1}
              </span>
              <div className="flex-grow">
                <h3 className="line-clamp-2 font-body-md text-body-md font-bold text-primary transition-colors group-hover:text-secondary">
                  {story.title}
                </h3>
                <span className="mt-1 block font-label-sm text-label-sm text-on-surface-variant">
                  {story.category}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}