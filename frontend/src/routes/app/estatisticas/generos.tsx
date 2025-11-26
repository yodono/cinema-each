"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Film, TrendingUp, Layers, Ticket } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryGenerosMaisAssistidos } from "@/features/clientes/api/useClientesQueries";
import { cn } from "@/lib/utils";
import { DarkGlass } from "@/components/DarkGlass";

// Rotas
export const Route = createFileRoute("/app/estatisticas/generos")({
  component: GenerosMensalPage,
});

// Tipagens
type RangeOption = "3m" | "6m" | "12m";

interface GeneroData {
  ano: number;
  mes: number;
  nome_genero: string;
  total_ingressos: number;
}

interface ResumoData {
  totalIngressos: number;
  topGenero: string;
  topValor: number;
  totalGenerosSelecionados: number;
}

// Cores personalizadas
const PRIMARY = "#a78bfa";
const SECONDARY = "#34C99A";
const WARNING = "#F5A623";

const CUSTOM_COLORS = [
  "#6C5CE7",
  "#0984E3",
  "#00CEC9",
  "#55EFC4",
  "#FDCB6E",
  "#E17055",
  "#D63031",
  "#E84393",
  "#A29BFE",
  "#74B9FF",
];

export default function GenerosMensalPage() {
  const [endMonth, setEndMonth] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<RangeOption>("6m");
  const [selectedGeneros, setSelectedGeneros] = useState<string[]>([]);
  const [autoSelectDone, setAutoSelectDone] = useState(false);
  const { inicio, fim, labelRange } = useMemo(() => {
    if (!endMonth) return { inicio: undefined, fim: undefined, labelRange: "Todos os meses" };

    const monthsBack = range === "3m" ? 3 : range === "6m" ? 6 : 12;
    const endYear = endMonth.getFullYear();
    const endMonthIndex = endMonth.getMonth();

    const startDate = new Date(endYear, endMonthIndex - (monthsBack - 1), 1);
    const endDate = new Date(endYear, endMonthIndex + 1, 0);

    const formatISO = (d: Date) => d.toISOString().slice(0, 10);

    return {
      inicio: formatISO(startDate),
      fim: formatISO(endDate),
      labelRange:
        `${startDate.toLocaleDateString("pt-BR", { month: "short", year: "numeric" })} – ` +
        `${endDate.toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}`,
    };
  }, [endMonth, range]);

  const filtersToQuery = useMemo(() => ({ inicio, fim }), [inicio, fim]);

  const q = useQueryGenerosMaisAssistidos(filtersToQuery);

  const typedData: GeneroData[] | undefined = useMemo(() => {
    if (!q.data) return undefined;
    return (q.data as any[]).map((item) => ({
      ...item,
      total_ingressos: Number(item.total_ingressos ?? 0),
    }));
  }, [q.data]);

  const allGenerosList = useMemo(() => {
    if (!typedData) return [];
    const list = Array.from(new Set(typedData.map((r) => r.nome_genero)));
    list.sort((a, b) => a.localeCompare(b, "pt-BR"));
    return list;
  }, [typedData]);

  useEffect(() => {
    if (allGenerosList.length > 0 && !autoSelectDone) {
      setSelectedGeneros(allGenerosList);
      setAutoSelectDone(true);
    }
  }, [allGenerosList, autoSelectDone]);
  const chartData = useMemo(() => {
    if (!typedData || selectedGeneros.length === 0) return [];

    const map = new Map<string, any>();

    typedData
      .filter((r) => selectedGeneros.includes(r.nome_genero))
      .forEach((row) => {
        const dateKey = `${row.ano}-${String(row.mes).padStart(2, "0")}`;
        if (!map.has(dateKey)) map.set(dateKey, { date: dateKey });
        map.get(dateKey)[row.nome_genero] =
          (map.get(dateKey)[row.nome_genero] ?? 0) + row.total_ingressos;
      });

    // Preenche campos ausentes
    for (const [, obj] of map) {
      selectedGeneros.forEach((g) => {
        if (!(g in obj)) obj[g] = 0;
      });
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([, value]) => value);
  }, [typedData, selectedGeneros]);

  // Resumo
  const resumo: ResumoData | null = useMemo(() => {
    if (!typedData) return null;

    const filtered = typedData.filter((r) => selectedGeneros.includes(r.nome_genero));
    if (!filtered.length)
      return { totalIngressos: 0, topGenero: "N/A", topValor: 0, totalGenerosSelecionados: 0 };

    const total = filtered.reduce((acc, o) => acc + o.total_ingressos, 0);

    const somaPorGenero = new Map<string, number>();
    filtered.forEach((item) => {
      somaPorGenero.set(
        item.nome_genero,
        (somaPorGenero.get(item.nome_genero) ?? 0) + item.total_ingressos
      );
    });

    let topGenero = "";
    let topValor = 0;

    somaPorGenero.forEach((v, k) => {
      if (v > topValor) {
        topValor = v;
        topGenero = k;
      }
    });

    return {
      totalIngressos: total,
      topGenero,
      topValor,
      totalGenerosSelecionados: selectedGeneros.length,
    };
  }, [typedData, selectedGeneros]);

  const numberFormatter = (n?: number) => new Intl.NumberFormat("pt-BR").format(n ?? 0);

  const shortMonth = (value: string) => {
    const [ano, mes] = value.split("-");
    return new Date(Number(ano), Number(mes) - 1)
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "");
  };

  function toggleGenero(g: string) {
    setSelectedGeneros((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex items-center gap-4">
        <div
          className="p-4 rounded-2xl shadow-lg"
          style={{ background: "rgba(167,139,250,0.13)", backdropFilter: "blur(8px)" }}
        >
          <Film className="w-8 h-8" style={{ color: PRIMARY }} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
          Gêneros Mais Assistidos por Mês
        </h1>
      </div>
      <DarkGlass className="px-6 py-5">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          🔎 Filtros
        </h2>

        <div className="flex gap-6 items-end flex-wrap">
          <div className="flex flex-col">
            <label className="text-sm text-zinc-300 mb-1">Mês de referência</label>
            <MonthPicker date={endMonth} onChange={setEndMonth} />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-zinc-300 mb-1">Janela</label>
            <Select value={range} onValueChange={(v) => setRange(v as RangeOption)}>
              <SelectTrigger className="w-[170px] h-10 bg-zinc-900 text-white rounded-lg">
                <SelectValue placeholder="Período" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="3m">Últimos 3 meses</SelectItem>
                <SelectItem value="6m">Últimos 6 meses</SelectItem>
                <SelectItem value="12m">Últimos 12 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-auto text-sm text-zinc-300">
            Período: <strong className="text-white">{labelRange}</strong>
          </div>
        </div>
      </DarkGlass>
      {allGenerosList.length > 0 && (
        <DarkGlass className="p-0">
          <CardHeader className="border-b border-white/5 py-4 px-6">
            <CardTitle className="text-xl font-semibold tracking-tight text-white">
               Filtrar por Gênero
            </CardTitle>
          </CardHeader>

          <div className="space-y-4 pt-6 p-6">
            <div className="flex flex-wrap gap-3">
              {allGenerosList.map((nome) => {
                const active = selectedGeneros.includes(nome);
                return (
                  <button
                    key={nome}
                    onClick={() => toggleGenero(nome)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-1 text-xs border transition-colors",
                      active
                        ? "bg-purple-600/20 border-purple-400 text-foreground hover:bg-purple-600/30"
                        : "bg-background border-muted-foreground/40 text-muted-foreground hover:bg-muted/10"
                    )}
                  >
                    <Checkbox checked={active} />
                    <span className="max-w-[160px] truncate">{nome}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedGeneros(allGenerosList)}>
                Selecionar todos ({allGenerosList.length})
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedGeneros([])}>
                Limpar seleção
              </Button>
            </div>
          </div>
        </DarkGlass>
      )}

      {q.isLoading && (
        <div className="space-y-6">
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-64 rounded-xl" />
          <Skeleton className="w-full h-[300px] rounded-xl" />
        </div>
      )}

      {!q.isLoading && resumo && (
        <div className="grid md:grid-cols-4 gap-6">
          <GlassStat title="Total de Ingressos" value={numberFormatter(resumo.totalIngressos)} icon={Ticket} color={PRIMARY} />
          <GlassStat title="Gênero Mais Assistido" value={resumo.topGenero} icon={TrendingUp} color={SECONDARY} />
          <GlassStat title="Ingressos do Líder" value={numberFormatter(resumo.topValor)} icon={Layers} color={WARNING} />
          <GlassStat title="Gêneros Selecionados" value={resumo.totalGenerosSelecionados} icon={Film} color={PRIMARY} />
        </div>
      )}
      <DarkGlass className="p-0">
        <CardHeader className="border-b border-white/5 py-4 px-6">
          <CardTitle className="text-xl font-semibold tracking-tight text-white">
             Gêneros por Mês
          </CardTitle>
        </CardHeader>

        <div className="p-6">
          {q.isLoading && <Skeleton className="h-96 w-full" />}

          {!q.isLoading && chartData.length > 0 && (
            <div style={{ width: "100%", height: chartData.length > 6 ? 600 : 420 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => numberFormatter(v as number)}
                    height={40}
                  />
                  <YAxis
                    dataKey="date"
                    type="category"
                    tickFormatter={shortMonth}
                    width={100}
                    label={{ value: "Mês", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    content={<CustomTooltip />}
                    wrapperStyle={{ zIndex: 50 }}
                  />

                  <Legend wrapperStyle={{ paddingTop: 12 }} />

                  {selectedGeneros.map((g, i) => (
                    <Bar
                      key={g}
                      dataKey={g}
                      name={g}
                      stackId="a"
                      fill={CUSTOM_COLORS[i % CUSTOM_COLORS.length]}
                      radius={[8, 8, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {!q.isLoading && chartData.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhum registro encontrado ou nenhum gênero selecionado para o período.
            </p>
          )}
        </div>
      </DarkGlass>
    </div>
  );
}

function GlassStat({ title, value, icon: Icon, color }: any) {
  return (
    <DarkGlass className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-300">{title}</p>
        <Icon className="w-6 h-6 opacity-80" style={{ color }} />
      </div>
      <p className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
        {value}
      </p>
    </DarkGlass>
  );
}
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg"
      style={{ background: "rgba(15,15,25,0.8)" }}
    >
      <p className="text-sm text-zinc-300 mb-2 font-medium">{label}</p>

      <div className="space-y-1">
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-zinc-400">{entry.name}</span>
            <span className="font-semibold text-white">
              {entry.value.toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
function MonthPicker({
  date,
  onChange,
}: {
  date?: Date;
  onChange: (d: Date | undefined) => void;
}) {
  return (
    <input
      type="month"
      className="h-10 px-3 rounded-lg border bg-zinc-900 text-white"
      value={date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}` : ""}
      onChange={(e) => {
        if (!e.target.value) return onChange(undefined);
        const [y, m] = e.target.value.split("-");
        onChange(new Date(Number(y), Number(m) - 1, 1));
      }}
    />
  );
}
