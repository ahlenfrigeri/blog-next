import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarArtigoPorSlug, buscarArtigos, formatarData } from "@/lib/artigos";

// ===== Estratégia de renderização: SSG =====
// 1) generateStaticParams diz ao Next QUAIS slugs existem.
//    No "npm run build", uma página HTML é gerada para cada um.
export async function generateStaticParams() {
  const artigos = await buscarArtigos();
  return artigos.map((artigo) => ({ slug: artigo.slug }));
}

// 2) Página totalmente estática...
export const dynamic = "force-static";
// 3) ...e qualquer slug fora da lista vira 404 (não tenta gerar na hora).
export const dynamicParams = false;

// ===== SEO dinâmico =====
// Título e descrição diferentes para cada artigo
export async function generateMetadata({ params }: PageProps<"/artigos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await buscarArtigoPorSlug(slug);

  if (!artigo) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: artigo.titulo,
    description: artigo.resumo,
    authors: [{ name: artigo.autor }],
    openGraph: {
      title: artigo.titulo,
      description: artigo.resumo,
      type: "article",
      publishedTime: artigo.data,
    },
  };
}

// ===== Página (Server Component assíncrono, sem useEffect) =====
export default async function PaginaArtigo({ params }: PageProps<"/artigos/[slug]">) {
  const { slug } = await params; // no Next 15+, params é uma Promise
  const artigo = await buscarArtigoPorSlug(slug);

  if (!artigo) {
    notFound(); // mostra a página 404
  }

  return (
    <article className="artigo">
      <Link href="/" className="voltar">
        ← Todos os artigos
      </Link>
      <h1>{artigo.titulo}</h1>
      <p className="meta">
        Por <strong>{artigo.autor}</strong> ·{" "}
        <time dateTime={artigo.data}>{formatarData(artigo.data)}</time>
      </p>
      <p className="resumo">{artigo.resumo}</p>
      {artigo.conteudo.map((paragrafo, i) => (
        <p key={i}>{paragrafo}</p>
      ))}
    </article>
  );
}
