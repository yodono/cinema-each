import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Table2,
} from "lucide-react";
import { useQueryIdadeMediaPorGenero } from "@/features/clientes/api/useClientesQueries";
import { cn } from "@/lib/utils";

const PRIMARY = "#8b5cf6";

function exportCSV(rows: any[]) {
  if (!rows || rows.length === 0) return;

  const header = "nome,idade_media\n";
  const csv = header + rows.map((r) => `${r.nome},${r.idade_media}`).join(`\n`);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "idade-media-generos.csv";
  a.click();
}

function SkeletonList() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-10 rounded-lg" />
      ))}
    </div>
  );
}

function MiniStat({ title, value, icon }: any) {
  return (
    <Card
      className="
        p-6 rounded-2xl shadow-xl border border-white/20 dark:border-white/10
        backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/30
        dark:from-zinc-900/40 dark:to-zinc-900/10
        hover:scale-[1.02] transition-all
      "
    >
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide">
          {title}
        </CardTitle>
        <div
          className="p-3 rounded-xl shadow-sm"
          style={{ background: `${PRIMARY}22` }}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-50">
        {value}
      </p>
    </Card>
  );
}

function CompactTable({
  data,
  sortField,
  sortDir,
  setSortField,
  setSortDir,
}: any) {
  if (!data || data.length === 0)
    return (
      <p className="p-6 text-muted-foreground">Nenhum dado para exibir.</p>
    );
  function handleSort(field: "nome" | "idade_media") {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir(field === "nome" ? "asc" : "desc");
    }
  }
  const getIndicator = (field: "nome" | "idade_media") =>
    sortField === field ? (sortDir === "asc" ? "▲" : "▼") : "";
  return (
    <Card
      className="
        rounded-2xl shadow-xl border border-white/20 dark:border-white/10
        backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40
      "
    >
      <CardHeader className="flex items-center justify-between border-b border-white/20 dark:border-white/10">
        <CardTitle className="text-2xl font-bold">Tabela detalhada</CardTitle>

        <Button
          onClick={() => exportCSV(data)}
          className="text-white px-4 py-2 rounded-xl font-medium shadow-lg transition-all hover:scale-105 active:scale-95"
          style={{
            background: PRIMARY,
            boxShadow: `0 0 12px ${PRIMARY}88`,
          }}
        >
          <Table2 className="w-4 h-4 mr-2" />
          Exportar CSV ({data.length})
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm">
            <thead
              className="
                bg-gradient-to-r from-purple-100 via-white to-purple-50
                dark:from-purple-900/40 dark:via-zinc-900 dark:to-purple-900/40
              "
            >
              <tr className="border-b border-zinc-300/40 dark:border-zinc-700/40">
                <th className="py-3 px-4 text-left font-semibold">#</th>

                <th className="py-3 px-4 text-left font-semibold">
                  <button
                    onClick={() => handleSort("nome")}
                    className={cn(
                      "flex items-center gap-2 hover:opacity-75 transition",
                      sortField === "nome" &&
                        "text-purple-700 dark:text-purple-300"
                    )}
                  >
                    Gênero
                    <ArrowUpDown className="w-3 h-3" />
                    <span>{getIndicator("nome")}</span>
                  </button>
                </th>

                <th className="py-3 px-4 text-right font-semibold">
                  <button
                    onClick={() => handleSort("idade_media")}
                    className={cn(
                      "flex items-center gap-2 justify-end w-full hover:opacity-75 transition",
                      sortField === "idade_media" &&
                        "text-purple-700 dark:text-purple-300"
                    )}
                  >
                    Idade Média
                    <ArrowUpDown className="w-3 h-3" />
                    <span>{getIndicator("idade_media")}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((g: any, i: number) => (
                <tr
                  key={i}
                  className={cn(
                    "transition-colors",
                    i % 2 === 0
                      ? "bg-white/40 dark:bg-zinc-900/20"
                      : "bg-white/10 dark:bg-zinc-900/5",
                    "hover:bg-purple-100/60 dark:hover:bg-purple-900/20"
                  )}
                >
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4 truncate">{g.nome}</td>
                  <td className="py-3 px-4 text-right font-semibold text-purple-700 dark:text-purple-200">
                    {g.idade_media}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute("/app/clientes/idade/generos")({
  component: IdadeMediaGeneroPage,
});
function IdadeMediaGeneroPage() {
  const q = useQueryIdadeMediaPorGenero();
  const [sortField, setSortField] = useState<"nome" | "idade_media">(
    "idade_media"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const allGeneros = useMemo(
    () => (q.data ? q.data.map((g: any) => g.nome) : []),
    [q.data]
  );
  const [selectedGeneros, setSelectedGeneros] = useState<string[]>([]);
  const [autoSelectDone, setAutoSelectDone] = useState(false);

  useEffect(() => {
    if (allGeneros.length > 0 && !autoSelectDone) {
      setSelectedGeneros(allGeneros);
      setAutoSelectDone(true);
    }
  }, [allGeneros, autoSelectDone]);

  const numericData = useMemo(() => {
    if (!q.data) return [];
    return q.data.map((item: any) => ({
      ...item,
      idade_media: Number(item.idade_media),
    }));
  }, [q.data]);

  const sortedData = useMemo(() => {
    const arr = [...numericData];
    arr.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      let cmp = 0;
      if (typeof aVal === "string") cmp = aVal.localeCompare(bVal);
      else cmp = aVal - bVal;
      return sortDir === "desc" ? cmp * -1 : cmp;
    });
    return arr;
  }, [numericData, sortField, sortDir]);

  const filteredData = useMemo(() => {
    if (!sortedData.length) return [];
    return sortedData.filter((g) => selectedGeneros.includes(g.nome));
  }, [sortedData, selectedGeneros]);

  const resumo = useMemo(() => {
    if (!filteredData.length) return null;
    const valores = filteredData.map((g) => g.idade_media);
    const soma = valores.reduce((a, b) => a + b, 0);
    const media = soma / valores.length;
    return {
      mediaGeral: Math.round(media),
      maior: Math.max(...valores),
      menor: Math.min(...valores),
      totalGeneros: valores.length,
    };
  }, [filteredData]);

  function toggleGenero(genero: string) {
    setSelectedGeneros((prev) =>
      prev.includes(genero)
        ? prev.filter((x) => x !== genero)
        : [...prev, genero]
    );
  }
  const radarData = useMemo(() => {
    if (!filteredData.length) return [];
    const maxAge = Math.max(...filteredData.map((d) => d.idade_media)) * 1.1;
    return filteredData.map((d) => ({
      nome: d.nome,
      idade_media: d.idade_media,
      fullMark: maxAge,
    }));
  }, [filteredData]);

  return (
    <div className="p-6 md:p-10 space-y-12">
      <div className="flex items-center gap-4">
        <div
          className="p-4 rounded-2xl shadow-lg backdrop-blur-xl"
          style={{ background: `${PRIMARY}22` }}
        >
          <Users className="w-8 h-8" style={{ color: PRIMARY }} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-700 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
          Idade Média por Gênero
        </h1>
      </div>
      {allGeneros.length > 0 && (
        <Card className="rounded-2xl shadow-xl border border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40">
          <CardHeader className="border-b border-white/20 dark:border-white/10">
            <CardTitle className="text-lg font-bold">
              Filtrar por Gênero
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-wrap gap-3">
              {allGeneros.map((nome) => {
                const active = selectedGeneros.includes(nome);
                return (
                  <button
                    key={nome}
                    onClick={() => toggleGenero(nome)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-3 py-1 text-xs border transition",
                      active
                        ? "bg-purple-500/20 border-purple-400 text-purple-100 hover:bg-purple-500/30"
                        : "bg-white/50 dark:bg-zinc-900/40 border-white/30 dark:border-white/10 hover:bg-white/70 dark:hover:bg-zinc-800"
                    )}
                  >
                    <Checkbox checked={active} />
                    <span>{nome}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedGeneros(allGeneros)}
                className="h-8 px-4"
              >
                Selecionar todos ({allGeneros.length})
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedGeneros([])}
                className="h-8 px-4"
              >
                Limpar seleção
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {!q.isLoading && resumo && (
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl">
          <MiniStat
            title="Média Geral"
            value={resumo.mediaGeral}
            icon={<Clock className="w-6 h-6" style={{ color: PRIMARY }} />}
          />
          <MiniStat
            title="Maior Média"
            value={resumo.maior}
            icon={<TrendingUp className="w-6 h-6" style={{ color: PRIMARY }} />}
          />
          <MiniStat
            title="Menor Média"
            value={resumo.menor}
            icon={
              <TrendingDown className="w-6 h-6" style={{ color: PRIMARY }} />
            }
          />
          <MiniStat
            title="Gêneros Selecionados"
            value={resumo.totalGeneros}
            icon={<Users className="w-6 h-6" style={{ color: PRIMARY }} />}
          />
        </div>
      )}
      {q.isLoading && (
        <div className="grid md:grid-cols-4 gap-4 max-w-5xl">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      )}
      {!q.isLoading && filteredData.length > 0 && (
        <Card className="rounded-2xl shadow-xl border border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Distribuição por Gênero
            </CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="75%"
                data={radarData}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <PolarGrid
                  gridType="circle"
                  stroke="var(--border)"
                  strokeOpacity={0.3}
                />
                <PolarAngleAxis
                  dataKey="nome"
                  tick={{
                    fill: "var(--foreground)",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, radarData[0]?.fullMark]}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontSize: 10,
                  }}
                  stroke="var(--border)"
                />
                <Tooltip
                  cursor={{ stroke: PRIMARY, strokeWidth: 1 }}
                  contentStyle={{
                    background: "var(--card)",
                    borderRadius: "12px",
                    border: `1px solid ${PRIMARY}55`,
                    backdropFilter: "blur(8px)",
                  }}
                  labelStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                  itemStyle={{ color: PRIMARY, fontWeight: 700 }}
                  formatter={(value: number) => [
                    `${Math.round(value)} anos`,
                    `Idade Média`,
                  ]}
                />
                <Radar
                  name="Idade Média"
                  dataKey="idade_media"
                  stroke={PRIMARY}
                  fill={PRIMARY}
                  fillOpacity={0.4}
                  strokeWidth={2.4}
                  style={{
                    filter: `drop-shadow(0px 0px 6px ${PRIMARY}55)`,
                  }}
                ></Radar>
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
      {q.isLoading && <SkeletonList />}
      {!q.isLoading && (
        <CompactTable
          data={filteredData}
          sortField={sortField}
          sortDir={sortDir}
          setSortField={setSortField}
          setSortDir={setSortDir}
        />
      )}
    </div>
  );
}
export default IdadeMediaGeneroPage;
