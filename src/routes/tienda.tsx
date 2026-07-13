import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PaintingIcon } from "./perfil";
import { useState } from "react";

export const Route = createFileRoute("/tienda")({
  head: () => ({ meta: [{ title: "Tienda — Arte por el mundo" }] }),
  component: TiendaPage,
});

const tabs = ["Obras", "Entradas", "Merch"] as const;
const categorias = ["Todo", "Música", "Pintura", "Escultura", "Teatro", "Cine", "Dibujo", "Tallado"] as const;
type Categoria = (typeof categorias)[number];

type Item = { titulo: string; desc: string; artista: string; precio: string; categoria?: Exclude<Categoria, "Todo"> };

const items: Record<(typeof tabs)[number], Item[]> = {
  Obras: [
    { titulo: "Atardecer urbano", desc: "Acuarela sobre papel.", artista: "Elena V.", precio: "$120", categoria: "Pintura" },
    { titulo: "Retrato en grafito", desc: "Dibujo realista.", artista: "Emilio", precio: "$95", categoria: "Dibujo" },
    { titulo: "Fragmento II", desc: "Escultura en cerámica.", artista: "Sara M.", precio: "$260", categoria: "Escultura" },
    { titulo: "Máscara ritual", desc: "Tallado en madera.", artista: "Bruno P.", precio: "$180", categoria: "Tallado" },
    { titulo: "Disco: Raíces", desc: "Álbum en vinilo.", artista: "Trío Mariscal", precio: "$28", categoria: "Música" },
    { titulo: "Cortometraje: Nube", desc: "Descarga digital 4K.", artista: "Cía. Nova", precio: "$8", categoria: "Cine" },
    { titulo: "Guion: La casa", desc: "Obra de teatro publicada.", artista: "Cía. Nova", precio: "$14", categoria: "Teatro" },
    { titulo: "Trazos del viento", desc: "Tinta china sobre papel.", artista: "Lía S.", precio: "$85", categoria: "Dibujo" },
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
  const [cat, setCat] = useState<Categoria>("Todo");
  const [cart, setCart] = useState(0);

  const lista = items[tab].filter((it) =>
    tab === "Obras" && cat !== "Todo" ? it.categoria === cat : true
  );

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

        <div className="flex flex-wrap gap-3 mb-6">
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

        {tab === "Obras" && (
          <div className="mb-8">
            <p className="font-hand text-xl mb-2">Filtrar por tipo de arte</p>
            <div className="flex flex-wrap gap-2">
              {categorias.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`sketch-border-sm font-hand text-lg px-4 py-1 ${cat === c ? "bg-ink text-paper" : "bg-white"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lista.map((it) => (
            <article key={it.titulo} className="sketch-border bg-white overflow-hidden flex flex-col">
              <div className="aspect-square bg-accent/60 grid place-items-center border-b-[3px] border-ink">
                <PaintingIcon />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-hand text-2xl">{it.titulo}</h3>
                <p className="text-ink/80 text-sm">{it.desc}</p>
                <p className="text-ink/70 text-sm font-hand text-lg mt-1">Artista: {it.artista}</p>
                {it.categoria && (
                  <span className="mt-1 inline-block w-fit sketch-border-sm bg-accent/60 px-2 py-0.5 text-xs font-hand">
                    {it.categoria}
                  </span>
                )}
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
          {lista.length === 0 && (
            <p className="col-span-full sketch-border bg-white p-8 text-center font-hand text-2xl text-ink/70">
              No hay obras en esta categoría todavía.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
