import type { Metadata } from "next";
import Link from "next/link";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({ variable: "--fonte-titulo", subsets: ["latin"] });
const inter = Inter({ variable: "--fonte-texto", subsets: ["latin"] });

// Metadados padrão. Cada artigo sobrescreve com generateMetadata.
export const metadata: Metadata = {
  title: {
    default: "Diário Dev · Blog sobre Next.js",
    template: "%s · Diário Dev", // %s é trocado pelo título de cada página
  },
  description: "Artigos curtos sobre Next.js, React e desenvolvimento web.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${inter.variable}`}>
      <body>
        <header className="cabecalho">
          <div className="largura">
            <Link href="/" className="logo">
              Diário<span>Dev</span>
            </Link>
          </div>
        </header>
        <main className="largura principal">{children}</main>
        <footer className="rodape">
          <p>Diário Dev · Exercício do Módulo 23 · EBAC Front-End</p>
        </footer>
      </body>
    </html>
  );
}
