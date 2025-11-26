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
import { useQueryReceitaColecionaveis } from "@/features/vendaProduto/api/useVendaProdutoQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/vendas/colecionaveis")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQueryReceitaColecionaveis();

  return (
    <div className="flex gap-6 flex-wrap items-stretch">
      {isLoading && (
        <Skeleton className="h-[500px] w-full rounded-xl bg-accent" />
      )}

      {!isLoading && data && (
        <Table>
          <TableCaption>Receita de colecionáveis (por filme)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>Filme</TableHead>
              <TableHead className="text-right">Receita</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, index) => (
              <TableRow>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{d.filme}</TableCell>
                <TableCell className="text-right">
                  R$ {d.valor_de_receita}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
