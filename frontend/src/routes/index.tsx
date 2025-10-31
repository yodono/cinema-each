import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen w-screen relative [view-transition-name:main-content]">
      <StarsBackground pointerEvents={false} className="absolute" />

      <div className="absolute top-1/2 left-1/2 translate-[-50%] flex flex-col justify-center items-center text-neutral-50 uppercase font-display gap-2 text-center">
        <h1 className="text-[calc(1.5rem+4vw)] font-bold">CineAnima</h1>
        <p className="text-[calc(1rem+0.25vw)]">
          Painel administrativo de gestão de cinema
        </p>
        <Link
          to="/app/cake"
          viewTransition={{ types: ["slide-in"] }}
          className="px-6 py-2 text-md transition font-bold mt-4 glass border-purple-500/20 bg-purple-500/20 hover:bg-purple-700/20"
        >
          Iniciar
        </Link>
      </div>
    </div>
  );
}
