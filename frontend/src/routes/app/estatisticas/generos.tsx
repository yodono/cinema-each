import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
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
import { useQueryGenerosMaisAssistidos } from "@/features/clientes/api/useClientesQueries";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

export const Route = createFileRoute("/app/estatisticas/generos")({
  component: RouteComponent,
});

function RouteComponent() {
  const [range, setRange] = useState<DateRange | undefined>();

  const { data, isLoading } = useQueryGenerosMaisAssistidos(
    {
      inicio: range?.from?.toISOString().split("T")[0],
      fim: range?.to?.toISOString().split("T")[0],
    },
    {
      enabled: !!range,
    }
  );

  const clear = () => {
    setRange(undefined);
  };

  return (
    <div className="flex gap-6 flex-wrap items-stretch">
      <div className="flex gap-3">
        <DateRangePicker range={range} onChange={setRange} />
        <Button
          variant={range ? "default" : "outline"}
          onClick={() => clear()}
          data-empty={!range}
          className="data-[empty=true]:text-muted-foreground"
        >
          Limpar
        </Button>
      </div>
      {isLoading &&
        Array(10).fill(
          <Skeleton className="h-[250px] w-[200px] rounded-xl bg-muted-foreground" />
        )}

      {!isLoading && data && (
        <Table>
          <TableCaption>
            Gêneros mais assistidos entre{" "}
            {range?.from?.toISOString().split("T")[0]} e{" "}
            {range?.to?.toISOString().split("T")[0]}.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>Gênero</TableHead>
              <TableHead className="text-right">Total Ingressos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, index) => (
              <TableRow>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{d.nome_genero}</TableCell>
                <TableCell className="text-right">
                  {d.total_ingressos}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
