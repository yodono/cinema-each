import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQueryPreEstreias } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";
import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/DateRangePicker";

export const Route = createFileRoute("/app/sessoes/pre-estreias")({
  component: RouteComponent,
});

function RouteComponent() {
  const [range, setRange] = useState<DateRange | undefined>();

  const { data, isLoading } = useQueryPreEstreias(
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
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Pré-estreias</h1>

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}

        {!isLoading &&
          data?.map((sessao) => (
            <Card key={sessao.id_sessao}>
              <CardHeader>
                <CardTitle>{sessao.filme}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <b>Data:</b> {sessao.data}
                </p>
                <p>
                  <b>Horário:</b> {sessao.horario}
                </p>
                <p>
                  <b>Sala:</b> {sessao.sala}
                </p>
                <p>
                  <b>Exibição:</b> {sessao.tipo_exibicao}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
