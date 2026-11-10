import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <section className="intro">
      <h1>Artigo não encontrado</h1>
      <p>O endereço pode estar errado ou o artigo foi removido.</p>
      <p>
        <Link href="/" className="leia">
          ← Voltar para a página inicial
        </Link>
      </p>
    </section>
  );
}
