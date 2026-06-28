import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PaintingIcon } from "./perfil";
import { useState } from "react";

export const Route = createFileRoute("/agenda")({
  head: () => ({ meta: [{ title: "Agenda cultural — Arte por el mundo" }] }),
  component: AgendaPage,
});

const filtros = ["Todos", "Conciertos", "Talleres", "Exposiciones"] as const;

const eventos = [
  { tipo: "Concierto", icon: "guitar", titulo: "Noche de jazz", desc: "Trío de jazz emergente.", lugar: "Café Mariscal, Quito", fecha: "12 Oct · 20:00", precio: "$12" },
  { tipo: "Taller", icon: "paint", titulo: "Taller de dibujo", desc: "Iniciación al claroscuro.", lugar: "La Nave, Lima", fecha: "15 Oct · 17:00", precio: "$25" },
  { tipo: "Exposición", icon: "mask", titulo: "Obra de teatro", desc: "Pieza experimental en escena.", lugar: "Teatro Sucre, Bogotá", fecha: "19 Oct · 19:30", precio: "$15" },
  { tipo: "Concierto", icon: "guitar", titulo: "Sonidos andinos", desc: "Fusión folclórica.", lugar: "Plaza Foch, Quito", fecha: "22 Oct · 21:00", precio: "Libre" },
  { tipo: "Taller", icon: "paint", titulo: "Acuarela urbana", desc: "Salida de campo.", lugar: "Centro Histórico, CDMX", fecha: "26 Oct · 10:00", precio: "$20" },
  { tipo: "Exposición", icon: "mask", titulo: "Cuerpos en tránsito", desc: "Danza contemporánea.", lugar: "Espacio 88, BCN", fecha: "30 Oct · 20:00", precio: "$18" },
];

function AgendaPage() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todos");
  const lista = eventos.filter((e) =>
    filtro === "Todos"
      ? true
      : filtro === "Conciertos" ? e.tipo === "Concierto"
      : filtro === "Talleres" ? e.tipo === "Taller"
      : e.tipo === "Exposición"
  );
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h1 className="font-hand text-5xl">Eventos</h1>
          <div className="flex gap-2">
            <button className="size-12 sketch-border-sm bg-white grid place-items-center" aria-label="Buscar">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            </button>
            <button className="size-12 sketch-border-sm bg-white grid place-items-center" aria-label="Filtrar">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`sketch-border-sm font-hand text-2xl px-6 py-2 ${filtro === f ? "bg-primary text-primary-foreground" : "bg-white"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((e) => (
            <article key={e.titulo} className="sketch-border bg-white overflow-hidden flex flex-col">
              <div className="aspect-[4/3] bg-accent/60 grid place-items-center border-b-[3px] border-ink">
                {e.icon === "guitar" && <GuitarIcon />}
                {e.icon === "paint" && <PaintingIcon />}
                {e.icon === "mask" && <MaskIcon />}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-hand text-2xl">{e.titulo}</h3>
                <p className="text-ink/80">{e.desc}</p>
                <dl className="mt-3 space-y-1 text-base text-ink/80">
                  <div><span className="font-hand text-lg">Ubicación: </span>{e.lugar}</div>
                  <div><span className="font-hand text-lg">Cuándo: </span>{e.fecha}</div>
                  <div><span className="font-hand text-lg">Costo: </span>{e.precio}</div>
                </dl>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 sketch-border-sm bg-primary text-primary-foreground font-hand text-xl py-2">Ver más</button>
                  <button className="sketch-border-sm bg-destructive text-destructive-foreground font-hand text-xl py-2 px-4">Reportar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

function GuitarIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M55 60 q15 -5 18 10 q3 15 -12 22 q-18 8 -25 -8 q-6 -14 19 -24 Z" className="text-ink" fill="#2a2a2a"/>
      <path d="M55 60 L40 28" className="text-ink"/>
      <rect x="34" y="14" width="14" height="18" rx="2" className="text-ink" fill="#2a2a2a"/>
    </svg>
  );
}

function MaskIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="38" cy="50" rx="22" ry="28" className="text-ink" fill="white"/>
      <ellipse cx="65" cy="55" rx="22" ry="28" className="text-ink" fill="white"/>
      <circle cx="33" cy="45" r="2" fill="currentColor"/>
      <circle cx="45" cy="45" r="2" fill="currentColor"/>
      <path d="M30 62 Q38 70 46 62" className="text-ink"/>
      <circle cx="60" cy="50" r="2" fill="currentColor"/>
      <circle cx="72" cy="50" r="2" fill="currentColor"/>
      <path d="M58 68 Q66 60 75 68" className="text-ink"/>
    </svg>
  );
}
