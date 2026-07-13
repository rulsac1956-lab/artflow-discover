import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PaintingIcon } from "./perfil";
import { useState } from "react";

export const Route = createFileRoute("/comunidad")({
  head: () => ({ meta: [{ title: "Comunidad — Arte por el mundo" }] }),
  component: ComunidadPage,
});

const tabs = ["Feed", "Artistas"] as const;

const posts = [
  {
    autor: "Elena V.",
    especialidad: "Acuarela",
    tiempo: "hace 2 h",
    texto: "Terminé una nueva serie sobre paisajes andinos. ¡Pronto en la tienda!",
  },
  {
    autor: "Marco R.",
    especialidad: "Óleo",
    tiempo: "hace 6 h",
    texto: "Buscando espacio para exposición en Cuenca durante noviembre. ¿Sugerencias?",
  },
  {
    autor: "Trío Mariscal",
    especialidad: "Música",
    tiempo: "ayer",
    texto: "Ya están las entradas para nuestra noche de jazz del 12 de octubre.",
  },
];

const artistas = [
  { nombre: "Emilio", esp: "Dibujo 3D", ciudad: "Quito" },
  { nombre: "Elena V.", esp: "Acuarela", ciudad: "Cuenca" },
  { nombre: "Marco R.", esp: "Óleo", ciudad: "Guayaquil" },
  { nombre: "Lía S.", esp: "Tinta china", ciudad: "Loja" },
  { nombre: "Bruno P.", esp: "Collage", ciudad: "Ambato" },
  { nombre: "Cía. Nova", esp: "Teatro", ciudad: "Quito" },
  { nombre: "Trío Mariscal", esp: "Música", ciudad: "Quito" },
  { nombre: "Sara M.", esp: "Escultura", ciudad: "Manta" },
];

function ComunidadPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Feed");
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-hand text-5xl">Comunidad</h1>
            <p className="text-ink/70 mt-1">Conecta con otros artistas y sigue lo que se mueve.</p>
          </div>
          <Link to="/perfil" className="sketch-border-sm bg-white font-hand text-xl px-5 py-2">
            Mi perfil
          </Link>
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

        {tab === "Feed" && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-6">
              <div className="sketch-border bg-white p-4">
                <textarea
                  placeholder="Comparte algo con la comunidad…"
                  className="w-full min-h-[90px] bg-transparent outline-none font-body text-lg resize-none"
                />
                <div className="flex justify-end">
                  <button className="sketch-border-sm bg-primary text-primary-foreground font-hand text-xl px-5 py-2">
                    Publicar
                  </button>
                </div>
              </div>
              {posts.map((p) => (
                <article key={p.autor + p.tiempo} className="sketch-border bg-white p-5">
                  <header className="flex items-center gap-3">
                    <div className="size-12 rounded-full sketch-border-sm bg-accent grid place-items-center font-hand text-xl">
                      {p.autor[0]}
                    </div>
                    <div>
                      <h3 className="font-hand text-2xl leading-none">{p.autor}</h3>
                      <p className="text-ink/60 text-sm">{p.especialidad} · {p.tiempo}</p>
                    </div>
                  </header>
                  <p className="mt-3 text-ink/85 leading-relaxed">{p.texto}</p>
                  <div className="mt-3 flex gap-4 text-ink/70 font-hand text-lg">
                    <button className="hover:text-primary">♥ Me gusta</button>
                    <button className="hover:text-primary">💬 Comentar</button>
                    <button className="hover:text-primary">↗ Compartir</button>
                  </div>
                </article>
              ))}
            </div>
            <aside className="space-y-4 h-fit">
              <div className="sketch-border bg-white p-5">
                <h3 className="font-hand text-2xl mb-2">Tendencias</h3>
                <ul className="space-y-1 text-ink/80">
                  <li>#AcuarelaUrbana</li>
                  <li>#JazzEnQuito</li>
                  <li>#DibujoRealista</li>
                  <li>#TeatroExperimental</li>
                </ul>
              </div>
              <div className="sketch-border bg-white p-5">
                <h3 className="font-hand text-2xl mb-2">Sugeridos</h3>
                <ul className="space-y-3">
                  {artistas.slice(0, 3).map((a) => (
                    <li key={a.nombre} className="flex items-center gap-3">
                      <div className="size-10 rounded-full sketch-border-sm bg-accent grid place-items-center font-hand">
                        {a.nombre[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-hand text-xl leading-none">{a.nombre}</p>
                        <p className="text-ink/60 text-sm">{a.esp}</p>
                      </div>
                      <button className="sketch-border-sm bg-white font-hand px-3 py-1 text-sm">Seguir</button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}

        {tab === "Artistas" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artistas.map((a) => (
              <article key={a.nombre} className="sketch-border bg-white p-5 text-center">
                <div className="mx-auto size-20 rounded-full sketch-border-sm bg-accent grid place-items-center mb-3">
                  <PaintingIcon />
                </div>
                <h3 className="font-hand text-2xl">{a.nombre}</h3>
                <p className="text-ink/70 text-sm">{a.esp}</p>
                <p className="text-ink/60 text-sm">{a.ciudad}</p>
                <button className="mt-3 sketch-border-sm bg-primary text-primary-foreground font-hand text-lg px-4 py-1 w-full">
                  Ver perfil
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
