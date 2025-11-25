import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useQuerySessoesMaisLotadas,
  useQueryTaxaOcupacao,
} from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app/sessoes/ocupacao")({
  component: RouteComponent,
});

function useOcupacao(type: "sessao" | "sala") {
  const sessaoQuery = useQueryTaxaOcupacao({
    enabled: type === "sessao",
  });

  const salaQuery = useQuerySessoesMaisLotadas({
    enabled: type === "sala",
  });

  return type === "sessao" ? sessaoQuery : salaQuery;
}

function RouteComponent() {
  const [tab, setTab] = useState<"sessao" | "sala">("sessao");
  const { data, isLoading } = useOcupacao(tab);

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        defaultValue="sessao"
        className="w-[400px]"
        onValueChange={(t) => setTab(t as "sessao" | "sala")}
      >
        <TabsList>
          <TabsTrigger value="sessao">Taxas por sessão</TabsTrigger>
          <TabsTrigger value="sala">Maiores taxas por sala</TabsTrigger>
        </TabsList>
      </Tabs>

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
                  {s.ingressos_vendidos}/{s.capacidade} assentos (
                  {s.taxa_ocupacao_percentual}%)
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
