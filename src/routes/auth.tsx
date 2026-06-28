import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Únete — Arte por el mundo" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [role, setRole] = useState<"artista" | "publico" | "organizador">("artista");

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="sketch-border bg-white p-8 md:p-12">
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 sketch-border-sm font-hand text-2xl py-3 ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-white"}`}
            >
              Registro
            </button>
            <button
              onClick={() => setMode("login")}
              className={`flex-1 sketch-border-sm font-hand text-2xl py-3 ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-white"}`}
            >
              Login
            </button>
          </div>

          <h1 className="font-hand text-4xl mb-2">
            {mode === "signup" ? "Crea tu cuenta" : "Bienvenido de vuelta"}
          </h1>
          <p className="text-ink/70 mb-8">
            {mode === "signup" ? "Únete a la comunidad de Arte por el mundo." : "Entra para seguir explorando."}
          </p>

          {mode === "signup" && (
            <div className="mb-6">
              <label className="font-hand text-xl mb-3 block">Soy…</label>
              <div className="grid grid-cols-3 gap-3">
                {(["artista", "publico", "organizador"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`sketch-border-sm py-3 font-hand text-lg capitalize ${role === r ? "bg-accent" : "bg-white"}`}
                  >
                    {r === "publico" ? "Público" : r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <Field label="Nombre" placeholder="Tu nombre artístico" />
            )}
            <Field label="Correo" type="email" placeholder="tu@correo.com" />
            <Field label="Contraseña" type="password" placeholder="••••••••" />
            <button type="submit" className="w-full sketch-border-sm bg-primary text-primary-foreground font-hand text-2xl py-4 mt-4">
              {mode === "signup" ? "Crear cuenta" : "Entrar"}
            </button>
          </form>

          <p className="text-center mt-6 text-ink/70">
            {mode === "signup" ? (
              <>¿Ya tienes cuenta?{" "}
                <button onClick={() => setMode("login")} className="underline font-bold">Inicia sesión</button>
              </>
            ) : (
              <>¿Nuevo aquí?{" "}
                <button onClick={() => setMode("signup")} className="underline font-bold">Regístrate</button>
              </>
            )}
          </p>
        </div>
        <p className="text-center mt-6">
          <Link to="/" className="font-hand text-xl underline">← Volver al inicio</Link>
        </p>
      </main>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="font-hand text-xl block mb-1">{label}</span>
      <input
        {...props}
        className="w-full sketch-border-sm bg-white px-4 py-3 text-lg font-body outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}
