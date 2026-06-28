import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useState } from "react";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Perfil del artista — Arte por el mundo" }] }),
  component: PerfilPage,
});

const tabs = ["Obras", "Eventos", "Tienda", "Reseñas"] as const;

const obras = [
  { t: "Atardecer urbano", k: "Acrílico sobre lienzo, 2024" },
  { t: "Memoria líquida", k: "Acuarela, 2023" },
  { t: "Trazos del viento", k: "Tinta china, 2024" },
];

export function PerfilPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Obras");
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[320px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="sketch-border bg-white p-6 h-fit">
          <div className="mx-auto size-40 rounded-full sketch-border-sm bg-accent grid place-items-center mb-4">
            <ArtistAvatar />
          </div>
          <h1 className="font-hand text-4xl text-center">Emilio</h1>
          <p className="text-center text-ink/70 font-hand text-xl">Dibujante</p>

          <div className="mt-6">
            <h3 className="font-hand text-xl mb-2">Breve descripción</h3>
            <p className="text-ink/80 text-base leading-relaxed">
              Ilustrador autodidacta. Exploro el realismo y el dibujo 3D con grafito y tinta.
              Basado en Quito.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-hand text-xl mb-2">Especialidad</h3>
            <div className="flex flex-wrap gap-2">
              <span className="sketch-border-sm bg-white px-3 py-1 text-sm font-hand">Dibujo 3D</span>
              <span className="sketch-border-sm bg-white px-3 py-1 text-sm font-hand">Realismo</span>
            </div>
          </div>

          <button className="mt-8 w-full sketch-border-sm bg-primary text-primary-foreground font-hand text-2xl py-3">
            Editar perfil
          </button>
        </aside>

        {/* Tabs */}
        <section>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {obras.map((o) => (
                <article key={o.t} className="sketch-border bg-white overflow-hidden">
                  <div className="aspect-[4/3] bg-accent/60 grid place-items-center border-b-[3px] border-ink">
                    <PaintingIcon />
                  </div>
                  <div className="p-4">
                    <h4 className="font-hand text-2xl">{o.t}</h4>
                    <p className="text-ink/70 text-sm">{o.k}</p>
                    <button className="mt-3 sketch-border-sm bg-white px-4 py-1 font-hand text-lg">Editar</button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === "Eventos" && (
            <div className="sketch-border bg-white p-8 text-center text-ink/70">
              <p className="font-hand text-2xl">Aún no tienes eventos programados.</p>
            </div>
          )}
          {tab === "Tienda" && (
            <div className="sketch-border bg-white p-8 text-center text-ink/70">
              <p className="font-hand text-2xl">Publica tu primera obra a la venta.</p>
            </div>
          )}
          {tab === "Reseñas" && (
            <div className="sketch-border bg-white p-8 text-center text-ink/70">
              <p className="font-hand text-2xl">Las reseñas de tu público aparecerán aquí.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ArtistAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 35 Q50 15 70 35 L65 25 Q50 18 50 18" className="text-destructive" fill="currentColor" />
      <circle cx="50" cy="50" r="18" className="text-ink" fill="#f5d3b5" />
      <path d="M40 55 Q50 65 60 55" className="text-ink" />
      <circle cx="44" cy="48" r="1.5" fill="currentColor" />
      <circle cx="56" cy="48" r="1.5" fill="currentColor" />
      <path d="M30 90 Q50 70 70 90" className="text-ink" fill="white" />
    </svg>
  );
}

export function PaintingIcon() {
  return (
    <svg viewBox="0 0 100 80" className="w-24 h-20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="10" width="80" height="60" rx="4" className="text-ink" fill="#9ee0ec" />
      <circle cx="32" cy="32" r="6" fill="#f5c54a" />
      <path d="M15 60 L40 35 L55 52 L70 30 L85 60 Z" fill="#3a9a4a" />
      <path d="M70 22 L82 14 L88 22 L78 32 Z" fill="#f5c54a" className="text-ink" />
    </svg>
  );
}
