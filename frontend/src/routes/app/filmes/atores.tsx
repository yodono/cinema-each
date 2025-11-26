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
import { useQueryAtoresPopulares } from "@/features/filme/api/useFilmeQueries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/filmes/atores")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQueryAtoresPopulares();

  return (
    <div className="flex gap-6 flex-wrap items-stretch">
      {isLoading && (
        <Skeleton className="h-[500px] w-full rounded-xl bg-accent" />
      )}

      {!isLoading && data && (
        <Table>
          <TableCaption>
            Atores mais populares (ingressos vendidos)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>Ator</TableHead>
              <TableHead className="text-right">Ingressos Vendidos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, index) => (
              <TableRow>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{d.ator}</TableCell>
                <TableCell className="text-right">
                  {d.quantidade_ingressos}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
