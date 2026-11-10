import type { NextConfig } from "next";

// cacheComponents fica desligado de propósito: assim o projeto usa o modelo
// clássico de renderização (generateStaticParams / dynamic = "force-static"),
// que é o pedido no enunciado do exercício.
const nextConfig: NextConfig = {};

export default nextConfig;
