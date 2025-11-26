import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  Sector,
  XAxis,
  YAxis,
} from "recharts";

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
import {
  useQueryBilheteriaDiretor,
  useQueryBilheteriaGenero,
} from "@/features/estatisticaRanking/api/useEstatisticaRankingQueries";

export const Route = createFileRoute("/app/estatisticas/bilheteria")({
  component: RouteComponent,
});

const COLOR_MAP: Record<string, string> = {
  // sala
  COMUM: "var(--chart-1)",
  VIP: "var(--chart-2)",
  IMAX: "var(--chart-3)",

  // genero
  Fantasia: "var(--chart-1)",
  Animação: "var(--chart-1)",
  Crime: "var(--chart-2)",
  Drama: "var(--chart-2)",
  Comédia: "var(--chart-3)",
  Família: "var(--chart-3)",
  Thriller: "var(--chart-4)",
  Romance: "var(--chart-4)",
  Aventura: "var(--chart-5)",
  Ficção: "var(--chart-5)",
};

const chartConfig = {
  valor_total: {
    label: "Total",
  },
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

function BilheteriaPorGenero() {
  const { data, isLoading } = useQueryBilheteriaGenero();

  return (
    <DarkGlass className="w-full h-full">
      {isLoading && (
        <Skeleton className="h-full w-full rounded-xl bg-muted-foreground" />
      )}
      {!isLoading && data && (
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="genero" />
            <YAxis />

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="valor_total"
              fill="var(--color-chart-1)"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.genero}
                  fill={COLOR_MAP[entry.genero] ?? "var(--chart-4)"}
                />
              ))}
            </Bar>
          </BarChart>
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

function BilheteriaPorDiretor() {
  const { data, isLoading } = useQueryBilheteriaDiretor();

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
              <TableHead>Diretor</TableHead>
              <TableHead className="text-right">Bilheteria</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, index) => (
              <TableRow>
                <TableCell className="font-medium">#{index + 1}</TableCell>
                <TableCell>{d.diretor}</TableCell>
                <TableCell className="text-right">
                  {d.valor_de_bilheteria}
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
    <div className="grid grid-cols-1 gap-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
        <div className="h-fit grid-">
          <BilheteriaPorSala />
        </div>

        <div className="h-fit">
          <BilheteriaPorGenero />
        </div>
      </div>

      <div className="h-fit">
        <BilheteriaPorDiretor />
      </div>

      <div className="h-fit">
        <BilheteriaPorFilme />
      </div>
    </div>
  );
}
