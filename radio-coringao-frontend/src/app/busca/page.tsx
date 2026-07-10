import type { Metadata } from "next";
import { SearchPageContent } from "@/presentation/components/search/SearchPageContent";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || "";
  return {
    title: query ? `Resultados para "${query}" - Rádio Coringão` : "Busca - Rádio Coringão",
    description: `Resultados da busca por ${query}`,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || "";

  return <SearchPageContent query={query} />;
}
