import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryFilmesMaisSessoes } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/estatisticas/sessoes")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQueryFilmesMaisSessoes();

  return (
    <div>
      <h1 className="text-xl">Filmes com mais sessões</h1>
      <div className="flex gap-6 flex-wrap items-stretch">
        {isLoading &&
          Array(10).fill(
            <Skeleton className="h-[250px] w-[200px] rounded-xl bg-muted-foreground" />
          )}

        {!isLoading && data && (
          <Table>
            <TableCaption>10 Filmes Com Mais Sessões Realizadas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ranking</TableHead>
                <TableHead>Filme</TableHead>
                <TableHead className="text-right">Sessões</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d, index) => (
                <TableRow>
                  <TableCell className="font-medium">#{index + 1}</TableCell>
                  <TableCell>{d.titulo}</TableCell>
                  <TableCell className="text-right">
                    {d.total_sessoes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
