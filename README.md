# Diário Dev: blog em Next.js (App Router)

Blog com rotas dinâmicas por artigo, busca de dados em **Server Components**, geração estática (**SSG**) e **SEO dinâmico** com `generateMetadata`. Exercício do Módulo 23 do curso de Front-End da EBAC.

**Aplicação no ar:** https://2311-blog-next.vercel.app

## Como os requisitos foram atendidos

| Requisito | Onde / como |
|---|---|
| Página inicial listando os artigos | `src/app/page.tsx` |
| Rota dinâmica por artigo | `src/app/artigos/[slug]/page.tsx` → `/artigos/ssg-ou-ssr-qual-escolher` |
| Busca de dados em Server Component (sem `useEffect`) | as páginas são `async` e chamam `buscarArtigos()` / `buscarArtigoPorSlug()` |
| Estratégia de renderização explícita | `generateStaticParams` + `export const dynamic = "force-static"` + `dynamicParams = false` (**SSG**) |
| Metadados únicos por artigo | `generateMetadata` no `[slug]/page.tsx` (title, description, Open Graph) |
| Slugs a partir do título | biblioteca **slugify** em `src/lib/artigos.ts` |
| Fonte de dados | JSON local em `data/artigos.json` |
| Deploy público | Vercel |

### Por que SSG?

Os artigos mudam pouco e todos os endereços são conhecidos no momento do build. Por isso o `generateStaticParams` gera uma página HTML para cada artigo durante o `npm run build`: elas abrem rápido e são fáceis de indexar. Um slug que não existe cai na página 404 (`dynamicParams = false`).

> O `cacheComponents` do Next 16 foi deixado **desligado** no `next.config.ts`, porque ele remove as opções `dynamic` e `dynamicParams` que o exercício pede.

## Estrutura

```
data/artigos.json                 artigos (título, autor, data, resumo, conteúdo)
src/
├── lib/artigos.ts                busca assíncrona, slugify e formatação de data
└── app/
    ├── layout.tsx                cabeçalho, rodapé e metadados padrão
    ├── page.tsx                  lista de artigos
    ├── not-found.tsx             página 404
    └── artigos/[slug]/page.tsx   artigo + generateStaticParams + generateMetadata
```

## Como rodar

```bash
npm install
npm run dev                # http://localhost:3000
npm run build && npm start # versão de produção
```

## Deploy

Publicado no Vercel (https://2311-blog-next.vercel.app) com a CLI: `npx vercel --prod`. Para ter deploy automático a cada push, conecte o repositório em Vercel → Project → Settings → Git.

## Tecnologias

Next.js 16 (App Router) · React 19 · TypeScript · slugify · Vercel
