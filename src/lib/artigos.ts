import { readFile } from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";

// Formato do artigo no JSON
interface ArtigoJson {
  titulo: string;
  autor: string;
  data: string; // AAAA-MM-DD
  resumo: string;
  conteudo: string[];
}

// Artigo com o slug calculado a partir do título
export interface Artigo extends ArtigoJson {
  slug: string;
}

// Gera "ssg-ou-ssr-qual-escolher" a partir de "SSG ou SSR: qual escolher?"
export function gerarSlug(titulo: string): string {
  return slugify(titulo, { lower: true, strict: true, locale: "pt" });
}

/**
 * Busca todos os artigos. Lê o JSON local de forma assíncrona, como se fosse
 * uma API. Roda só no servidor (Server Components), nunca no navegador.
 */
export async function buscarArtigos(): Promise<Artigo[]> {
  const caminho = path.join(process.cwd(), "data", "artigos.json");
  const texto = await readFile(caminho, "utf-8");
  const artigos: ArtigoJson[] = JSON.parse(texto);

  return artigos
    .map((artigo) => ({ ...artigo, slug: gerarSlug(artigo.titulo) }))
    .sort((a, b) => b.data.localeCompare(a.data)); // mais recente primeiro
}

export async function buscarArtigoPorSlug(slug: string): Promise<Artigo | undefined> {
  const artigos = await buscarArtigos();
  return artigos.find((artigo) => artigo.slug === slug);
}

export function formatarData(iso: string): string {
  // "T12:00" evita que o fuso horário mude o dia
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
