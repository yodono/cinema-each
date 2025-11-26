import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Film,
  TrendingUp,
  TrendingDown,
  Clock,
  Table2,
} from "lucide-react";
import { useQueryIdadeMediaPorFilme } from "@/features/clientes/api/useClientesQueries";
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
  a.download = "idade-media-filmes.csv";
  a.click();
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

  const getSortIndicator = (field: "nome" | "idade_media") => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? "▲" : "▼";
  };

  return (
    <Card
      className="
        rounded-2xl shadow-xl border border-white/20 dark:border-white/10 
        backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40
      "
    >
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/20 dark:border-white/10">
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
                    Filme
                    <ArrowUpDown className="w-3 h-3" />
                    <span>{getSortIndicator("nome")}</span>
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
                    <span>{getSortIndicator("idade_media")}</span>
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((f: any, i: number) => (
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
                  <td className="py-3 px-4 truncate">{f.nome}</td>
                  <td className="py-3 px-4 text-right font-semibold text-purple-700 dark:text-purple-200">
                    {f.idade_media}
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

export const Route = createFileRoute("/app/clientes/idade/filmes")({
  component: IdadeMediaFilmePage,
});

function IdadeMediaFilmePage() {
  const q = useQueryIdadeMediaPorFilme();

  const [sortField, setSortField] = useState<"nome" | "idade_media">(
    "idade_media"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const allFilmes = useMemo(
    () => (q.data ? q.data.map((f: any) => f.nome) : []),
    [q.data]
  );

  const [selectedFilmes, setSelectedFilmes] = useState<string[]>([]);
  const [autoSelectDone, setAutoSelectDone] = useState(false);

  useEffect(() => {
    if (allFilmes.length > 0 && !autoSelectDone) {
      setSelectedFilmes(allFilmes);
      setAutoSelectDone(true);
    }
  }, [allFilmes, autoSelectDone]);

  const numericData = useMemo(() => {
    if (!q.data) return [];
    return q.data.map((item: any) => ({
      ...item,
      idade_media: Number(item.idade_media),
    }));
  }, [q.data]);

  const sortedData = useMemo(() => {
    if (!numericData.length) return [];

    const copy = [...numericData];
    copy.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      let comparison = 0;

      if (typeof aVal === "string" && typeof bVal === "string")
        comparison = aVal.localeCompare(bVal);
      else if (typeof aVal === "number" && typeof bVal === "number")
        comparison = aVal - bVal;

      return sortDir === "desc" ? comparison * -1 : comparison;
    });

    return copy;
  }, [numericData, sortField, sortDir]);

  const filteredData = useMemo(() => {
    if (!sortedData.length) return [];
    if (selectedFilmes.length === 0) return [];
    return sortedData.filter((f) => selectedFilmes.includes(f.nome));
  }, [sortedData, selectedFilmes]);

  const resumo = useMemo(() => {
    if (!filteredData.length) return null;

    const medias = filteredData.map((f: any) => f.idade_media);
    const soma = medias.reduce((acc, v) => acc + v, 0);
    const mediaCrua = soma / medias.length;

    return {
      mediaGeral: Math.round(mediaCrua).toString(),
      maior: Math.max(...medias),
      menor: Math.min(...medias),
      totalFilmes: filteredData.length,
    };
  }, [filteredData]);

  function toggleFilme(nome: string) {
    setSelectedFilmes((prev) =>
      prev.includes(nome) ? prev.filter((f) => f !== nome) : [...prev, nome]
    );
  }

  return (
    <>
      {allFilmes.length > 0 && (
        <Card
          className="
          rounded-2xl shadow-xl border border-white/20 dark:border-white/10 
          backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40
        "
        >
          <CardHeader className="border-b border-white/20 dark:border-white/10">
            <CardTitle className="text-lg font-bold">
              Filtrar por Filme
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-wrap gap-3">
              {allFilmes.map((nome) => (
                <button
                  key={nome}
                  onClick={() => toggleFilme(nome)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-1 text-xs border transition-all",
                    selectedFilmes.includes(nome)
                      ? "bg-purple-500/20 border-purple-400 text-purple-100 hover:bg-purple-500/30"
                      : "bg-white/50 dark:bg-zinc-900/40 border-white/30 dark:border-white/10 text-muted-foreground hover:bg-white/70 dark:hover:bg-zinc-800"
                  )}
                >
                  <Checkbox checked={selectedFilmes.includes(nome)} />
                  {nome}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFilmes(allFilmes)}
                className="h-8 px-4"
              >
                Selecionar todos ({allFilmes.length})
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilmes([])}
                className="h-8 px-4"
              >
                Limpar
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
            title="Filmes Selecionados"
            value={resumo.totalFilmes}
            icon={<Film className="w-6 h-6" style={{ color: PRIMARY }} />}
          />
        </div>
      )}

      {q.isLoading && (
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      )}

      {!q.isLoading && filteredData.length > 0 && (
        <Card
          className="
          rounded-2xl shadow-xl border border-white/20 dark:border-white/10 
          backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40
        "
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Distribuição por Filme
            </CardTitle>
          </CardHeader>

          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <defs>
                  <linearGradient
                    id="idadeGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#ccc" vertical={false} opacity={0.2} />

                <XAxis
                  type="number"
                  tick={{
                    fill: "var(--foreground)",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="nome"
                  tick={{
                    fill: "var(--foreground)",
                    fontSize: 13,
                  }}
                  width={170}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--background)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "10px",
                    border: `1px solid ${PRIMARY}`,
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                  itemStyle={{ color: "var(--foreground)" }}
                />

                <Bar
                  dataKey="idade_media"
                  fill="url(#idadeGradient)"
                  radius={[6, 6, 6, 6]}
                >
                  <LabelList
                    dataKey="idade_media"
                    position="right"
                    fill="var(--foreground)"
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {!q.isLoading && (
        <CompactTable
          data={filteredData}
          sortField={sortField}
          sortDir={sortDir}
          setSortField={setSortField}
          setSortDir={setSortDir}
        />
      )}
    </>
  );
}

export default IdadeMediaFilmePage;
