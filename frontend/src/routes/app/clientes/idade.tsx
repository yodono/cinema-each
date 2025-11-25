import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Film, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const GLASS_BG = "rgba(255,255,255,0.07)";
const GLASS_BORDER = "rgba(255,255,255,0.14)";
const PRIMARY = "#a78bfa";
const TEXT_LIGHT = "#E8E8F4";

export const Route = createFileRoute("/app/clientes/idade")({
  component: IdadePage,
});

function DarkGlass({ children, className }: any) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all shadow-[0_0_30px_rgba(0,0,0,0.25)] hover:shadow-[0_0_45px_rgba(0,0,0,0.35)] border backdrop-blur-xl",
        className
      )}
      style={{
        background: GLASS_BG,
        borderColor: GLASS_BORDER,
      }}
    >
      {children}
    </div>
  );
}

function IdadePage() {
  return (
    <div className="p-6 md:p-10 space-y-10">
      <div className="flex items-center gap-4">
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(167,139,250,0.12)",
            border: `1px solid ${GLASS_BORDER}`,
            backdropFilter: "blur(6px)",
          }}
        >
          <Users className="w-7 h-7" style={{ color: PRIMARY }} />
        </div>

        <h1
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: TEXT_LIGHT }}
        >
          Relatórios de Análise: Idade Média
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <DarkGlass>
          <div className="flex items-center justify-between mb-4">
            <Users className="w-10 h-10" style={{ color: PRIMARY }} />

            <Link
              to="/app/clientes/idade-media/generos"
              className="flex items-center gap-2 font-semibold transition-all hover:gap-3"
              style={{ color: PRIMARY }}
            >
              Acessar análise
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: TEXT_LIGHT }}
          >
            Idade Média por Gênero
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed">
            Visualize a média de idade dos clientes que assistem a cada gênero
            de filme.
          </p>
        </DarkGlass>

        <DarkGlass>
          <div className="flex items-center justify-between mb-4">
            <Film className="w-10 h-10" style={{ color: PRIMARY }} />

            <Link
              to="/app/clientes/idade-media/filmes"
              className="flex items-center gap-2 font-semibold transition-all hover:gap-3"
              style={{ color: PRIMARY }}
            >
              Acessar análise
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: TEXT_LIGHT }}
          >
            Idade Média por Filme
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed">
            Compare a média de idade do público que assiste a cada título
            específico.
          </p>
        </DarkGlass>
      </div>
    </div>
  );
}

export default IdadePage;
