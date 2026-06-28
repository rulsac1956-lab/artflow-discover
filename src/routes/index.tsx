import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arte por el mundo — Inicio" },
      { name: "description", content: "Que tu arte no se quede solo contigo." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <section className="sketch-border bg-white p-8 md:p-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="font-hand text-5xl md:text-6xl leading-tight">
                Que tu arte no se quede solo contigo.
              </h1>
              <p className="mt-6 text-xl text-ink/80 max-w-md">
                La plataforma digital que une artistas con su público. Explora eventos próximos,
                o revisa los distintos perfiles de artistas que comparten su arte con el mundo.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/agenda" className="sketch-border-sm bg-primary text-primary-foreground font-hand text-2xl px-8 py-3">
                  Explorar
                </Link>
                <Link to="/auth" className="sketch-border-sm bg-white text-ink font-hand text-2xl px-8 py-3">
                  Únete
                </Link>
              </div>
            </div>
            <HeroIllustration />
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { t: "Perfiles", d: "Crea tu portafolio y comparte tus obras.", to: "/perfil" },
            { t: "Eventos", d: "Agenda cultural filtrable por ciudad y disciplina.", to: "/agenda" },
            { t: "Mapa", d: "Encuentra espacios culturales cerca de ti.", to: "/mapa" },
          ].map((c) => (
            <Link key={c.t} to={c.to} className="sketch-border bg-white p-6 hover:-translate-y-1 transition-transform block">
              <h3 className="font-hand text-3xl">{c.t}</h3>
              <p className="mt-2 text-ink/70">{c.d}</p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-full bg-accent/60 blur-2xl" />
      <svg viewBox="0 0 400 400" className="relative w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Easel */}
        <path d="M200 90 L130 340 M200 90 L270 340 M150 250 L250 250" className="text-ink" />
        {/* Canvas */}
        <rect x="135" y="110" width="130" height="120" rx="4" className="text-ink" fill="white" />
        <path d="M155 195 L180 160 L200 180 L225 145 L245 195 Z" className="text-primary" fill="currentColor" opacity="0.7" />
        <circle cx="170" cy="135" r="6" className="text-primary" fill="currentColor" />
        {/* Guitar */}
        <path d="M310 230 q20 -10 25 10 q5 20 -15 30 q-25 12 -35 -8 q-8 -18 25 -32 Z" className="text-ink" fill="white" />
        <path d="M310 230 L290 180" className="text-ink" />
        <rect x="282" y="160" width="16" height="24" rx="2" className="text-ink" fill="white" />
        {/* Mic */}
        <circle cx="100" cy="230" r="14" className="text-ink" fill="white" />
        <path d="M100 244 L100 280 M85 285 L115 285" className="text-ink" />
      </svg>
    </div>
  );
}
