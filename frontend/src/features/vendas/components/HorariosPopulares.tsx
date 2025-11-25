import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryHorariosPopulares } from "@/features/sessao/api/useSessaoQueries";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

function formatHorario([h, m]: number[]) {
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${hh}:${mm}`;
}

const chartConfig = {
  ingressos_vendidos: {
    label: "Ingressos",
    color: "var(--chart-1)",
  },
};

export function HorariosPopulares() {
  const { data, isLoading } = useQueryHorariosPopulares();

  return (
    <>
      {isLoading && <Skeleton className="h-[230px] rounded-xl" />}

      {!isLoading && data && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[350px] w-full"
        >
          <BarChart
            data={data.map((d) => ({
              ...d,
              horario: formatHorario(d.horario),
            }))}
            layout="vertical"
          >
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            <YAxis dataKey="horario" type="category" width={60} />

            <XAxis type="number" hide />

            <Bar
              dataKey="ingressos_vendidos"
              radius={[0, 4, 4, 0]}
              fill="var(--color-chart-1)"
            />
          </BarChart>
        </ChartContainer>
      )}
    </>
  );
}
