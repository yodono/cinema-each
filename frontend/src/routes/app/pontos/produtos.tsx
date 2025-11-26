import { Skeleton } from "@/components/ui/skeleton";
import { useQueryPontosProdutosResgatados } from "@/features/pontos/api/usePontoQueries";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/app/pontos/produtos")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQueryPontosProdutosResgatados();

  return (
    <div className="flex gap-6 flex-wrap items-stretch">
      {isLoading && (
        <Skeleton className="h-[500px] w-full rounded-xl bg-accent" />
      )}

      {!isLoading && data && (
        <Table>
          <TableCaption>Produtos mais resgatados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>Filme</TableHead>
              <TableHead className="text-right">Total Resgatado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, index) => (
              <TableRow>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{d.nome_produto}</TableCell>
                <TableCell className="text-right">
                  {d.total_resgatado} unidades
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
