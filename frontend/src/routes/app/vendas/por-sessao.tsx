import { GlassStat } from "@/components/GlassStat";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryVendasPorSessao } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/vendas/por-sessao")({
  component: RouteComponent,
});

const chartConfig = {
  inteiras_vendidas: {
    label: "Meias",
    color: "var(--chart-1)",
  },
  meias_vendidas: {
    label: "Inteiras",
    color: "var(--chart-2)",
  },
};

function RouteComponent() {
  const { data, isLoading } = useQueryVendasPorSessao();

  return (
    <div className="flex gap-6 flex-wrap items-stretch">
      {isLoading && (
        <Skeleton className="h-full w-full rounded-xl bg-muted-foreground" />
      )}

      {!isLoading && data && (
        <div className="flex gap-12">
          <div className="h-auto w-3/5">
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />

                <XAxis
                  dataKey="id_sessao"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />

                <YAxis
                  stroke="#ccc"
                  tick={{ fill: "#ccc", fontSize: 12 }}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar
                  dataKey="inteiras_vendidas"
                  stackId="a"
                  fill="var(--color-chart-1)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="meias_vendidas"
                  stackId="a"
                  fill="var(--color-chart-2)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>

          <div className="flex gap-2 h-fit">
            <GlassStat
              title="Total Inteiras"
              value={data[0].total_inteiras_geral}
            />
            <GlassStat title="Total Meias" value={data[0].total_meias_geral} />
            <GlassStat
              title="Total Ingressos"
              value={data[0].total_inteiras_geral + data[0].total_meias_geral}
            />
          </div>
        </div>
      )}
    </div>
  );
}
