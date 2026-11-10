import Link from "next/link";
import { buscarArtigos, formatarData } from "@/lib/artigos";

// Server Component assíncrono: busca os dados direto aqui, sem useEffect.
// O HTML já sai do servidor com a lista pronta.
export default async function Home() {
  const artigos = await buscarArtigos();

  return (
    <>
      <section className="intro">
        <h1>Aprendendo Next.js, um artigo por semana</h1>
        <p>Textos curtos e práticos sobre rotas, renderização, SEO e deploy.</p>
      </section>

      <ul className="lista">
        {artigos.map((artigo) => (
          <li key={artigo.slug} className="cartao">
            <p className="meta">
              <time dateTime={artigo.data}>{formatarData(artigo.data)}</time> · {artigo.autor}
            </p>
            <h2>
              {/* Cada artigo tem a sua própria URL: /artigos/<slug> */}
              <Link href={`/artigos/${artigo.slug}`}>{artigo.titulo}</Link>
            </h2>
            <p>{artigo.resumo}</p>
            <Link href={`/artigos/${artigo.slug}`} className="leia">
              Ler artigo →
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
