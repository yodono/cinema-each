import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryVendasPorSessao } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/vendas/por-sessao")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQueryVendasPorSessao();

  return (
    <div>
      <h1 className="text-xl">Vendas por sessão</h1>
      <div className="flex gap-6 flex-wrap">
        {isLoading &&
          Array(10).fill(
            <Skeleton className="h-[250px] w-[200px] rounded-xl bg-muted-foreground" />
          )}

        {!isLoading &&
          data?.map((vendas) => (
            <Card className="pt-0">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                  <CardTitle>{vendas.filme}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-">
                {JSON.stringify(vendas, null, 2)}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
