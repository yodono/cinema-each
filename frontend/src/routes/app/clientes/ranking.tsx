import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, Trophy, Search } from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  LabelList,
} from "recharts";
import { useQueryRankingClientesPorCompra } from "@/features/clientes/api/useClientesQueries";
import { cn } from "@/lib/utils";
import { DarkGlass } from "@/components/DarkGlass";
import { GlassStat } from "@/components/GlassStat";

const PRIMARY = "#a78bfa";

export const Route = createFileRoute("/app/clientes/ranking")({
  component: RankingComprasPage,
});

type SortField = "nome" | "total_produtos_comprados";

interface ClienteRanking {
  id_cliente: number;
  nome: string;
  cpf: string;
  total_produtos_comprados: number;
}

function RankingComprasPage() {
  const [inputInicio, setInputInicio] = useState<string>();
  const [inputFim, setInputFim] = useState<string>();

  const [activeFilters, setActiveFilters] = useState<{
    inicio?: string;
    fim?: string;
  }>({});

  const q = useQueryRankingClientesPorCompra(activeFilters);

  const [sortField, setSortField] = useState<SortField>(
    "total_produtos_comprados"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const applyFilters = () => {
    setActiveFilters({ inicio: inputInicio, fim: inputFim });
  };

  const sortedData = useMemo(() => {
    if (!q.data) return [];

    return [...(q.data as ClienteRanking[])].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      return sortDir === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
    });
  }, [q.data, sortField, sortDir]);

  const resumo = useMemo(() => {
    if (!q.data) return null;

    return {
      totalClientes: sortedData.length,
      totalIngressos: sortedData.reduce(
        (sum, item) => sum + item.total_produtos_comprados,
        0
      ),
    };
  }, [sortedData]);

  return (
    <>
      <DarkGlass>
        <div className="flex gap-6 items-end flex-wrap">
          <div className="flex flex-col">
            <label className="text-sm text-zinc-300 mb-1">Data Início</label>
            <input
              type="date"
              className="h-10 px-3 rounded-lg border bg-zinc-900 text-white"
              value={inputInicio ?? ""}
              onChange={(e) => setInputInicio(e.target.value || undefined)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-zinc-300 mb-1">Data Fim</label>
            <input
              type="date"
              className="h-10 px-3 rounded-lg border bg-zinc-900 text-white"
              value={inputFim ?? ""}
              onChange={(e) => setInputFim(e.target.value || undefined)}
            />
          </div>

          <Button
            onClick={applyFilters}
            className="flex items-center gap-2 px-6 h-10 text-white rounded-xl shadow-md hover:scale-105 transition"
            style={{ background: PRIMARY }}
          >
            <Search className="w-4 h-4" />
            Aplicar
          </Button>
        </div>
      </DarkGlass>

      {q.isLoading && (
        <div className="space-y-6">
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-64 rounded-xl" />
          <Skeleton className="w-full h-[300px] rounded-xl" />
        </div>
      )}

      {!q.isLoading && resumo && (
        <div className="grid md:grid-cols-2 gap-6">
          <GlassStat title="Clientes Ranqueados" value={resumo.totalClientes} />
          <GlassStat title="Produtos Vendidos" value={resumo.totalIngressos} />
        </div>
      )}

      {!q.isLoading && sortedData.length > 0 && (
        <DarkGlass>
          <CardHeader className="px-2 pb-4">
            <CardTitle className="text-xl font-semibold text-white">
              Top 10 Clientes
            </CardTitle>
          </CardHeader>

          <CardContent className="h-80 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData.slice(0, 10)}>
                <defs>
                  <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor={PRIMARY} offset="0%" stopOpacity={0.9} />
                    <stop stopColor="#4c1d95" offset="100%" stopOpacity={0.9} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="nome"
                  tick={{ fill: "#ccc", fontSize: 11 }}
                  angle={-40}
                  textAnchor="end"
                  interval={0}
                  height={60}
                />
                <YAxis tick={{ fill: "#ccc" }} />

                <Tooltip
                  contentStyle={{
                    background: "rgba(20,20,30,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />

                <Bar
                  dataKey="total_produtos_comprados"
                  fill="url(#barColor)"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList
                    dataKey="total_produtos_comprados"
                    position="top"
                    style={{ fill: "white", fontSize: 11 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </DarkGlass>
      )}

      <div className="flex justify-end">
        <Button
          onClick={() => exportCSV(sortedData)}
          disabled={q.isLoading || sortedData.length === 0}
          className="px-6 py-2 text-white rounded-xl shadow-md hover:scale-105 transition"
          style={{ background: PRIMARY }}
        >
          Exportar CSV
        </Button>
      </div>

      <DarkGlass>
        <CardHeader className="p-0 pb-4 mb-3 border-b border-white/10">
          <CardTitle className="text-xl font-semibold text-white">
            Lista Completa de Clientes
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!q.isLoading && (
            <TableRanking
              data={sortedData}
              sortField={sortField}
              sortDir={sortDir}
              setSortField={setSortField}
              setSortDir={setSortDir}
            />
          )}
        </CardContent>
      </DarkGlass>
    </>
  );
}

function TableRanking({
  data,
  sortField,
  sortDir,
  setSortField,
  setSortDir,
}: any) {
  function handleSort(field: SortField) {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm text-white">
        <thead className="bg-zinc-900/40 border-b border-white/10">
          <tr>
            <th className="py-3 px-4 text-left font-semibold">RANK</th>

            <th className="py-3 px-4 text-left font-semibold">
              <button
                onClick={() => handleSort("nome")}
                className={cn(
                  "flex items-center gap-2 hover:text-purple-300 transition",
                  sortField === "nome" && "text-purple-300"
                )}
              >
                Nome
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>

            <th className="py-3 px-4 text-left font-semibold">CPF</th>

            <th className="py-3 px-4 text-right font-semibold">
              <button
                onClick={() => handleSort("total_produtos_comprados")}
                className={cn(
                  "flex items-center justify-end gap-2 hover:text-purple-300 transition",
                  sortField === "total_produtos_comprados" && "text-purple-300"
                )}
              >
                Total
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((c: ClienteRanking, i: number) => {
            const rank = i + 1;
            const display =
              rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank;

            return (
              <tr
                key={c.id_cliente}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="py-3 px-4">{display}</td>
                <td className="py-3 px-4">{c.nome}</td>
                <td className="py-3 px-4">{formatCPF(c.cpf)}</td>
                <td className="py-3 px-4 text-right font-bold text-purple-300">
                  {c.total_produtos_comprados}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatCPF(cpf: string) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
}

function exportCSV(rows: any[]) {
  const header = "nome,cpf,total\n";

  const csv =
    header +
    rows
      .map((r) => `${r.nome},${r.cpf},${r.total_produtos_comprados}`)
      .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ranking-clientes.csv";
  a.click();
}

export default RankingComprasPage;
