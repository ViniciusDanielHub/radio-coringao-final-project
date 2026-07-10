import type { Metadata } from "next";
import { TermsContent } from "@/presentation/components/pages/TermsContent";

export const metadata: Metadata = {
  title: "Termos de Uso - Rádio Coringão",
  description: "Termos e condições de uso do portal Rádio Coringão.",
};

export default function TermosPage() {
  return <TermsContent />;
}
