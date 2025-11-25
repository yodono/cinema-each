import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuerySessoesMaisLotadas } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/sessoes/ocupacao")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuerySessoesMaisLotadas();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Sessões Mais Lotadas por Sala</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[230px] rounded-xl" />
          ))}

        {!isLoading &&
          data?.map((s) => (
            <Card key={s.id_sessao}>
              <CardHeader>
                <CardTitle>{s.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>
                  <b>Sala:</b> {s.sala}
                </p>
                <Progress value={s.taxa_ocupacao_percentual} />
                <p className="text-sm text-muted-foreground">
                  {s.ingressos_vendidos}/{s.capacidade} assentos
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
