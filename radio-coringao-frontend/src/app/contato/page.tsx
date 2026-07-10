import type { Metadata } from "next";
import { ContactContent } from "@/presentation/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Fale Conosco - Rádio Coringão",
  description: "Entre em contato com o Rádio Coringão.",
};

export default function FaleConoscoPage() {
  return <ContactContent />;
}
