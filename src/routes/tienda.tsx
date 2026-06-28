import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PaintingIcon } from "./perfil";
import { useState } from "react";

export const Route = createFileRoute("/tienda")({
  head: () => ({ meta: [{ title: "Tienda — Arte por el mundo" }] }),
  component: TiendaPage,
});

const tabs = ["Obras", "Entradas", "Merch"] as const;

const items = {
  Obras: [
    { titulo: "Obra A", desc: "Acuarela sobre papel.", artista: "Elena V.", precio: "$120" },
    { titulo: "Obra B", desc: "Óleo sobre lienzo.", artista: "Marco R.", precio: "$240" },
    { titulo: "Obra C", desc: "Tinta y grafito.", artista: "Lía S.", precio: "$85" },
    { titulo: "Obra D", desc: "Collage mixto.", artista: "Bruno P.", precio: "$160" },
  ],
  Entradas: [
    { titulo: "Noche de jazz", desc: "Concierto · 12 Oct.", artista: "Trío Mariscal", precio: "$12" },
    { titulo: "Taller de dibujo", desc: "Cupo limitado · 15 Oct.", artista: "Emilio", precio: "$25" },
    { titulo: "Obra de teatro", desc: "Pieza experimental · 19 Oct.", artista: "Cía. Nova", precio: "$15" },
    { titulo: "Acuarela urbana", desc: "Salida de campo · 26 Oct.", artista: "Lía S.", precio: "$20" },
  ],
  Merch: [
    { titulo: "Camiseta APM", desc: "Algodón orgánico.", artista: "Arte por el mundo", precio: "$28" },
    { titulo: "Cuaderno A5", desc: "Tapa ilustrada.", artista: "Marco R.", precio: "$14" },
    { titulo: "Tote bag", desc: "Serigrafía manual.", artista: "Lía S.", precio: "$18" },
    { titulo: "Print A3", desc: "Edición limitada.", artista: "Elena V.", precio: "$35" },
  ],
};

function TiendaPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Obras");
  const [cart, setCart] = useState(0);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h1 className="font-hand text-5xl">Tienda</h1>
          <div className="flex gap-2">
            <button className="size-12 sketch-border-sm bg-white grid place-items-center" aria-label="Buscar">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            </button>
            <button className="relative h-12 sketch-border-sm bg-white px-4 grid place-items-center font-hand text-xl" aria-label="Carrito">
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 4h2l2 12h12l2-8H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>
                Carrito ({cart})
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`sketch-border-sm font-hand text-2xl px-6 py-2 ${tab === t ? "bg-primary text-primary-foreground" : "bg-white"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items[tab].map((it) => (
            <article key={it.titulo} className="sketch-border bg-white overflow-hidden flex flex-col">
              <div className="aspect-square bg-accent/60 grid place-items-center border-b-[3px] border-ink">
                <PaintingIcon />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-hand text-2xl">{it.titulo}</h3>
                <p className="text-ink/80 text-sm">{it.desc}</p>
                <p className="text-ink/70 text-sm font-hand text-lg mt-1">Artista: {it.artista}</p>
                <p className="font-hand text-2xl mt-2">{it.precio}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setCart((c) => c + 1)}
                    className="flex-1 sketch-border-sm bg-primary text-primary-foreground font-hand text-lg py-2"
                  >
                    Comprar
                  </button>
                  <button className="sketch-border-sm bg-destructive text-destructive-foreground font-hand text-lg py-2 px-3" aria-label="Reportar">
                    !
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
