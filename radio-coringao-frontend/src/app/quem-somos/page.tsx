import type { Metadata } from "next";
import { AboutContent } from "@/presentation/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "Quem Somos - Rádio Coringão",
  description: "Conheça a história do Rádio Coringão.",
};

export default function QuemSomosPage() {
  return <AboutContent />;
}
