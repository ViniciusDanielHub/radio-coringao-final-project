import type { Metadata } from "next";
import { JobsContent } from "@/presentation/components/pages/JobsContent";

export const metadata: Metadata = {
  title: "Trabalhe Conosco - Rádio Coringão",
  description: "Faça parte do time do Rádio Coringão.",
};

export default function TrabalheConoscoPage() {
  return <JobsContent />;
}
