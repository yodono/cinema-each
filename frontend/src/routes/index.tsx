import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-neutral-100">
      {/* --- VIDEO DE BACKGROUND --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="/videos/landing.mp4" type="video/mp4" />
      </video>

      {/* Stars bem discretas */}
      <StarsBackground
        pointerEvents={false}
        className="absolute inset-0 opacity-15"
      />

      {/* Vignette suave */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,black_100%)] opacity-30" />

      {/* --- Conteudo --- */}
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center uppercase font-display">
        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs tracking-[0.3em] mb-6"
        >
          Administração • Análises • Cinema
        </motion.span>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-[calc(2rem+5vw)] font-bold bg-clip-text text-transparent
                     bg-gradient-to-r from-white via-purple-300 to-white animate-pulse-sheen"
        >
          CineAnima
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 text-[calc(0.9rem+0.4vw)] tracking-wide text-neutral-300 mb-8"
        >
          Painel administrativo de gestão de cinema
        </motion.p>

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          <Link
            to="/app/filmes/cartaz"
            viewTransition={{ types: ["slide-in"] }}
            className="mt-8 px-8 py-3 text-lg font-semibold rounded-2xl
                       bg-purple-600/20 backdrop-blur-md border border-purple-500/30
                       transition-all duration-300
                       hover:bg-purple-600/30 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            Conheça seu público
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
