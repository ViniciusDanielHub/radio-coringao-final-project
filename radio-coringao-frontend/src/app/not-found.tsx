import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-margin-mobile py-20 text-center md:px-margin-desktop">
      <div className="mb-4 text-[80px] font-black leading-none text-outline sm:text-[100px]">404</div>
      <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
        Página não encontrada
      </h1>
      <p className="mb-6 max-w-sm font-body-md text-body-md text-on-surface-variant">
        A página que você procura não existe ou foi movida.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2.5 font-label-sm text-label-sm font-bold text-on-primary transition-colors hover:bg-secondary"
        >
          Início
        </Link>
        <Link
          href="/noticias"
          className="rounded-lg border border-outline-variant px-5 py-2.5 font-label-sm text-label-sm font-bold text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
        >
          Notícias
        </Link>
      </div>
    </div>
  );
}
