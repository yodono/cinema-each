import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryPreEstreias } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/sessoes/pre-estreias")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQueryPreEstreias({
    inicio: "2025-11-01",
    fim: "2025-11-30",
  });

  return (
    <div>
      <h1 className="text-xl">Sessões de pré-estreia</h1>
      <p className="mb-8">
        Mostrando resultados entre {"2025-11-01"} e {"2025-11-10"}
      </p>
      <div className="flex gap-6 flex-wrap">
        {isLoading &&
          Array(10).fill(
            <Skeleton className="h-[250px] w-[200px] rounded-xl bg-muted-foreground" />
          )}

        {!isLoading &&
          data?.map((sessao) => (
            <Card className="pt-0">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                  <CardTitle>{sessao.filme}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                {sessao.data}
                {"\n"}
                {sessao.horario}
                {"\n"}
                Sala {sessao.sala}
                {"\n"}
                {sessao.tipo_audio}
                {"\n"}
                {sessao.tipo_exibicao}
                {"\n"}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
