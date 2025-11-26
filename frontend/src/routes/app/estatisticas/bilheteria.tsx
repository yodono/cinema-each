import { Cell, Label, Pie, PieChart, Sector } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useQueryBilheteria,
  useQueryBilheteriaPorSala,
} from "@/features/sessao/api/useSessaoQueries";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DarkGlass } from "@/components/DarkGlass";

export const Route = createFileRoute("/app/estatisticas/bilheteria")({
  component: RouteComponent,
});

const COLOR_MAP: Record<string, string> = {
  COMUM: "var(--chart-1)",
  VIP: "var(--chart-2)",
  IMAX: "var(--chart-3)",
};

const chartConfig = {
  COMUM: {
    label: "COMUM",
  },
  VIP: {
    label: "VIP",
  },
  IMAX: {
    label: "IMAX",
  },
};

function BilheteriaPorSala() {
  const { data, isLoading } = useQueryBilheteriaPorSala();

  return (
    <DarkGlass className="w-full h-full">
      {isLoading && (
        <Skeleton className="h-full w-full rounded-xl bg-muted-foreground" />
      )}
      {!isLoading && data && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie
              data={data.sort(
                (a, b) => b.arrecadacao_total - a.arrecadacao_total
              )}
              dataKey="arrecadacao_total"
              nameKey="tipo_sala"
              innerRadius={60}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          R${" "}
                          {data.reduce(
                            (acc, curr) => curr.arrecadacao_total + acc,
                            0
                          )}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Bilheteria
                        </tspan>
                      </text>
                    );
                  }
                }}
              />

              {data.map((entry) => (
                <Cell
                  key={entry.tipo_sala}
                  fill={COLOR_MAP[entry.tipo_sala] ?? "var(--chart-4)"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
    </DarkGlass>
  );
}

function BilheteriaPorFilme() {
  const { data, isLoading } = useQueryBilheteria();

  return (
    <>
      {isLoading && (
        <Skeleton className="h-full w-full rounded-xl bg-muted-foreground" />
      )}
      {!isLoading && data && (
        <Table>
          <TableCaption>Bilheteria por filme</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ranking</TableHead>
              <TableHead>Filme</TableHead>
              <TableHead>Ingressos Vendidos</TableHead>
              <TableHead className="text-right">Bilheteria</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, index) => (
              <TableRow>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{d.titulo}</TableCell>
                <TableCell>{d.ingressos_vendidos}</TableCell>
                <TableCell className="text-right">
                  {d.arrecadacao_total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

function RouteComponent() {
  return (
    <div className="flex gap-6 items-stretch">
      <div className="w-3/5">
        <BilheteriaPorFilme />
      </div>
      <div className="w-2/5">
        <BilheteriaPorSala />
      </div>

      {/* colocar bilheteria por diretor e por genero */}
    </div>
  );
}
