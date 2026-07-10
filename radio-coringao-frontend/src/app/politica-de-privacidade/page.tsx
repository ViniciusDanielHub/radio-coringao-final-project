import type { Metadata } from "next";
import { PrivacyContent } from "@/presentation/components/pages/PrivacyContent";

export const metadata: Metadata = {
  title: "Política de Privacidade - Rádio Coringão",
  description: "Política de privacidade do portal Rádio Coringão.",
};

export default function PoliticaPrivacidadePage() {
  return <PrivacyContent />;
}
