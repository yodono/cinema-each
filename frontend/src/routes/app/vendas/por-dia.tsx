import { DarkGlass } from "@/components/DarkGlass";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryVendasPorDiaSemana } from "@/features/sessao/api/useSessaoQueries";
import { HorariosPopulares } from "@/features/vendas/components/HorariosPopulares";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
    <div className="flex gap-6 items-stretch">
      <div className="w-3/5">
        {isLoading && (
          <Skeleton className="h-full w-full rounded-xl bg-muted-foreground" />
        )}
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
              <YAxis
                stroke="#ccc"
                tick={{ fill: "#ccc", fontSize: 12 }}
                allowDecimals={false}
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
      <div className="w-2/5">
        <DarkGlass className="w-full h-full flex flex-col gap-6 items-center">
          <span>Horários Populares</span>
          <HorariosPopulares />
        </DarkGlass>
      </div>
    </div>
  );
}
