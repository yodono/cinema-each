import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryVendasPorDiaSemana } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const Route = createFileRoute("/app/vendas/por-dia")({
  component: RouteComponent,
});

const chartConfig = {
  meias: {
    label: "Meias",
    color: "var(--chart-1)",
  },
  inteiras: {
    label: "Inteiras",
    color: "var(--chart-2)",
  },
};

function RouteComponent() {
  const { data, isLoading } = useQueryVendasPorDiaSemana();

  return (
    <div>
      <h1 className="text-xl">Vendas por dia da semana</h1>
      <div className="flex gap-6 flex-wrap items-stretch">
        {isLoading &&
          Array(5).fill(
            <Skeleton className="h-[250px] w-[150px] rounded-xl bg-muted-foreground" />
          )}

        <div className="h-auto w-3/4">
          {!isLoading && data && (
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="dia_semana"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />

                <Bar
                  dataKey="meias"
                  stackId="a"
                  fill="var(--color-chart-1)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="inteiras"
                  stackId="a"
                  fill="var(--color-chart-2)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </div>
    </div>
  );
}
