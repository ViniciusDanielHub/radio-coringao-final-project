import type { Metadata } from "next";
import { AdvertiseContent } from "@/presentation/components/pages/AdvertiseContent";

export const metadata: Metadata = {
  title: "Anuncie Conosco - Rádio Coringão",
  description: "Anuncie no maior portal de notícias do Corinthians.",
};

export default function AnunciePage() {
  return <AdvertiseContent />;
}
