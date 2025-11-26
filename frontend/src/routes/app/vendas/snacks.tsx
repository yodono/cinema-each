import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryVendaSnacks } from "@/features/vendaProduto/api/useVendaProdutoQueries";
import type { VendaSnacks } from "@/types/vendaProdutoTypes";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/vendas/snacks")({
  component: RouteComponent,
});

interface PivotDia {
  dow: number;
  dia_semana: string;
  [snack: string]: number | string;
}

const pivot = (data: VendaSnacks[]): PivotDia[] => {
  const dias: Record<number, PivotDia> = {};

  data.forEach((item) => {
    const dow = item.dow;

    if (!dias[dow]) {
      dias[dow] = {
        dow,
        dia_semana: item.dia_semana,
      };
    }

    // Adiciona a coluna do snack
    dias[dow][item.snack] = item.quantidade_vendida;
  });

  // Ordena por dow (0..6)
  return Object.values(dias).sort((a, b) => a.dow - b.dow);
};

const chartConfig = {
  Nacho: {
    label: "Nacho",
    color: "var(--color-chart-1)",
  },
  "Pipoca M": {
    label: "Pipoca M",
    color: "var(--color-chart-2)",
  },
  "Pipoca P": {
    label: "Pipoca P",
    color: "var(--color-chart-3)",
  },
  Refrigerante: {
    label: "Refrigerante",
    color: "var(--color-chart-4)",
  },
};

function RouteComponent() {
  const { data, isLoading } = useQueryVendaSnacks();

  return (
    <div className="flex gap-6 flex-wrap items-stretch">
      {isLoading && (
        <Skeleton className="h-[450px] w-full rounded-xl bg-accent" />
      )}

      {!isLoading && data && (
        <div className="h-auto w-full">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={pivot(data)}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="dia_semana"
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
                dataKey="Nacho"
                stackId="snacks"
                fill="var(--color-chart-1)"
              />
              <Bar
                dataKey="Pipoca M"
                stackId="snacks"
                fill="var(--color-chart-2)"
              />
              <Bar
                dataKey="Pipoca P"
                stackId="snacks"
                fill="var(--color-chart-3)"
              />
              <Bar
                dataKey="Refrigerante"
                stackId="snacks"
                fill="var(--color-chart-4)"
              />
            </BarChart>
          </ChartContainer>
        </div>
      )}
    </div>
  );
}
