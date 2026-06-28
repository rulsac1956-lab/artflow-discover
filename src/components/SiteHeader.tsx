import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/agenda", label: "Eventos" },
    { to: "/mapa", label: "Mapa" },
    { to: "/tienda", label: "Tienda" },
    { to: "/perfil", label: "Comunidad" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-paper border-b-[3px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="font-hand text-3xl sm:text-4xl text-ink leading-none shrink-0">
          Arte por el mundo
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-hand text-2xl">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-ink hover:text-primary transition-colors"
              activeProps={{ className: "text-primary underline underline-offset-4" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/auth"
          className="shrink-0 size-12 grid place-items-center rounded-full sketch-border-sm bg-white"
          aria-label="Cuenta"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-7 8-7s8 3 8 7" strokeLinecap="round" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
