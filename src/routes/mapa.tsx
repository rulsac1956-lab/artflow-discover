import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useState } from "react";

export const Route = createFileRoute("/mapa")({
  head: () => ({ meta: [{ title: "Mapa de espacios culturales — Arte por el mundo" }] }),
  component: MapaPage,
});

const espacios = [
  { id: 1, nombre: "Galería La Nave", tipo: "Galería", ciudad: "Quito", x: 30, y: 38 },
  { id: 2, nombre: "Centro Cultural Sucre", tipo: "Teatro", ciudad: "Bogotá", x: 55, y: 55 },
  { id: 3, nombre: "Espacio 88", tipo: "Coworking", ciudad: "Lima", x: 22, y: 70 },
  { id: 4, nombre: "Café Mariscal", tipo: "Bar cultural", ciudad: "Quito", x: 42, y: 30 },
  { id: 5, nombre: "Teatro del Sol", tipo: "Teatro", ciudad: "CDMX", x: 70, y: 25 },
  { id: 6, nombre: "Casa Taller", tipo: "Estudio", ciudad: "BCN", x: 78, y: 60 },
];

function MapaPage() {
  const [sel, setSel] = useState(espacios[0]);
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-hand text-5xl mb-2">Mapa de espacios</h1>
        <p className="text-ink/70 mb-8">Descubre galerías, teatros y estudios culturales cerca de ti.</p>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          {/* Lista */}
          <aside className="sketch-border bg-white p-4 h-[600px] overflow-y-auto">
            <h2 className="font-hand text-2xl mb-3 px-2">{espacios.length} espacios</h2>
            <ul className="space-y-2">
              {espacios.map((e) => (
                <li key={e.id}>
                  <button
                    onClick={() => setSel(e)}
                    className={`w-full text-left sketch-border-sm p-3 ${sel.id === e.id ? "bg-accent" : "bg-white"}`}
                  >
                    <div className="font-hand text-xl">{e.nombre}</div>
                    <div className="text-sm text-ink/70">{e.tipo} · {e.ciudad}</div>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Mapa */}
          <div className="sketch-border bg-white p-4 h-[600px] relative overflow-hidden">
            <div className="absolute inset-4 rounded-lg bg-[radial-gradient(circle_at_30%_40%,oklch(0.92_0.05_180)_0%,transparent_40%),radial-gradient(circle_at_70%_60%,oklch(0.93_0.04_120)_0%,transparent_40%)] bg-muted">
              {/* grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30" stroke="currentColor" strokeWidth="1" fill="none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" />
                ))}
              </svg>

              {/* pins */}
              {espacios.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setSel(e)}
                  className="absolute -translate-x-1/2 -translate-y-full group"
                  style={{ left: `${e.x}%`, top: `${e.y}%` }}
                  aria-label={e.nombre}
                >
                  <svg viewBox="0 0 24 32" className={`w-8 h-10 transition-transform ${sel.id === e.id ? "scale-125" : "group-hover:scale-110"}`} fill={sel.id === e.id ? "var(--primary)" : "white"} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
                    <path d="M12 1c5 0 10 4 10 10 0 8-10 20-10 20S2 19 2 11C2 5 7 1 12 1Z"/>
                    <circle cx="12" cy="11" r="3.5" fill={sel.id === e.id ? "white" : "var(--primary)"} stroke="none"/>
                  </svg>
                </button>
              ))}

              {/* selected card */}
              <div className="absolute bottom-4 left-4 right-4 sketch-border-sm bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-hand text-2xl">{sel.nombre}</h3>
                    <p className="text-ink/70">{sel.tipo} · {sel.ciudad}</p>
                  </div>
                  <button className="sketch-border-sm bg-primary text-primary-foreground font-hand text-lg px-4 py-2">
                    Ver perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
