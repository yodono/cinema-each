import { GlassStat } from "@/components/GlassStat";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryFormaPagamento } from "@/features/vendaProduto/api/useVendaProdutoQueries";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/vendas/pagamento")({
  component: RouteComponent,
});

const COLOR_MAP: Record<string, string> = {
  PIX: "var(--chart-1)",
  DÉBITO: "var(--chart-2)",
  CRÉDITO: "var(--chart-3)",
  FIDELIDADE: "var(--chart-4)",
};

const chartConfig = {
  ingressos_comprados: {
    label: "Ingressos",
  },
};

function RouteComponent() {
  const { data, isLoading } = useQueryFormaPagamento();
  return (
    <div className="flex flex-col gap-6 items-stretch">
      <div className="w-4/5">
        {isLoading && (
          <Skeleton className="h-full w-full rounded-xl bg-muted-foreground" />
        )}
        {!isLoading && data && (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="forma_pagamento" />
              <YAxis />

              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />

              <Bar
                dataKey="ingressos_comprados"
                fill="var(--color-chart-1)"
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.forma_pagamento}
                    fill={COLOR_MAP[entry.forma_pagamento] ?? "var(--chart-4)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </div>

      <div className="flex gap-6">
        {!isLoading &&
          data?.map?.((item) => (
            <GlassStat
              key={item.forma_pagamento}
              title={item.forma_pagamento}
              value={item.ingressos_comprados}
            />
          ))}
      </div>
    </div>
  );
}
