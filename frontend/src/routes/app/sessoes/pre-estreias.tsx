import { Skeleton } from "@/components/ui/skeleton";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/sessoes/pre-estreias")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-xl mb-8">Sessões de pré-estreia</h1>
      <div className="flex gap-6 flex-wrap">
        {Array(10).fill(
          <Skeleton className="h-[250px] w-[200px] rounded-xl bg-muted-foreground" />
        )}
      </div>
    </div>
  );
}
