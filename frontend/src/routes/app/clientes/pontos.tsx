import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Gift, ArrowUpDown, Download } from "lucide-react";
import { useQueryRankingClientesPorResgate } from "@/features/clientes/api/useClientesQueries";
import type { ClienteResgateRanking } from "@/types/clientesTypes";
import { cn } from "@/lib/utils";
const PRIMARY = "#a78bfa";
const PRIMARY_DARK = "#6d28d9";
const GLASS_BG = "rgba(20,20,30,0.55)";
const GLASS_BORDER = "rgba(255,255,255,0.06)";
const TEXT_LIGHT = "#E6E6F0";

export const Route = createFileRoute("/app/clientes/pontos")({
  component: RankingResgatePage,
});

function formatCPF(cpf: string) {
  if (!cpf) return "";
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
}

function exportCSV(rows: ClienteResgateRanking[]) {
  if (!rows || rows.length === 0) return;

  const header = "id_cliente,nome,cpf,total_pontos_resgatados\n";
  const csv =
    header +
    rows
      .map(
        (r) =>
          `${r.id_cliente},${JSON.stringify(r.nome).replace(/(^"|"$)/g, "")},${
            r.cpf
          },${r.total_pontos_resgatados}`
      )
      .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ranking-resgate-pontos.csv";
  a.click();
}

function DarkGlass({ className, children }: any) {
  return (
    <div
      className={cn("rounded-2xl shadow-lg p-5", className)}
      style={{
        background: GLASS_BG,
        border: `1px solid ${GLASS_BORDER}`,
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </div>
  );
}

function RankingResgatePage() {
  const q = useQueryRankingClientesPorResgate();

  const sortedData = useMemo(() => {
    if (!q.data) return [];

    return [...q.data].sort(
      (a, b) => b.total_pontos_resgatados - a.total_pontos_resgatados
    );
  }, [q.data]);

  const resumo = useMemo(() => {
    if (!sortedData.length) return null;

    return {
      totalClientes: sortedData.length,
      totalPontos: sortedData.reduce(
        (acc, obj) => acc + obj.total_pontos_resgatados,
        0
      ),
      topNome: sortedData[0].nome,
      topPontos: sortedData[0].total_pontos_resgatados,
    };
  }, [sortedData]);

  return (
    <div>
      {q.isLoading ? (
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      ) : (
        resumo && (
          <div className="grid md:grid-cols-3 gap-6">
            <GlassStat
              title="Clientes que resgataram"
              value={resumo.totalClientes}
            />
            <GlassStat
              title="Total de pontos resgatados"
              value={resumo.totalPontos.toLocaleString("pt-BR")}
            />
            <GlassStat
              title="Top cliente"
              value={`${resumo.topNome} • ${resumo.topPontos.toLocaleString(
                "pt-BR"
              )}`}
            />
          </div>
        )
      )}
      {!q.isLoading && sortedData.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-6">
          <DarkGlass className="lg:col-span-2">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: TEXT_LIGHT }}
            >
              Top clientes por pontos resgatados
            </h3>

            <div style={{ height: 380 }}>
              <RankingBarChart data={sortedData.slice(0, 10)} />
            </div>
          </DarkGlass>
          <DarkGlass>
            <h3
              className="text-lg font-semibold mb-4 text-center"
              style={{ color: TEXT_LIGHT }}
            >
              Participação nos pontos (Top 5)
            </h3>

            <div style={{ height: 280 }}>
              <RankingDonutChart data={sortedData.slice(0, 5)} />
            </div>
          </DarkGlass>
        </div>
      )}
      <DarkGlass>
        <CardHeader className="p-0 mb-3 flex items-center justify-between border-b border-white/10 pb-3">
          <CardTitle
            className="text-lg font-semibold"
            style={{ color: TEXT_LIGHT }}
          >
            Lista completa de clientes
          </CardTitle>

          <Button
            onClick={() => exportCSV(sortedData)}
            className="h-9 px-3 flex items-center gap-2 text-white"
            style={{ background: PRIMARY_DARK }}
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          {q.isLoading ? (
            <SkeletonList />
          ) : sortedData.length === 0 ? (
            <p className="p-4 text-zinc-300">Nenhum cliente resgatou pontos.</p>
          ) : (
            <RankingTable data={sortedData} />
          )}
        </CardContent>
      </DarkGlass>
    </div>
  );
}

function GlassStat({ title, value }: any) {
  return (
    <DarkGlass>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-zinc-300">{title}</div>

          <div
            className="mt-2 text-2xl font-extrabold"
            style={{ color: TEXT_LIGHT }}
          >
            {value}
          </div>
        </div>

        <div
          className="p-2 rounded-lg"
          style={{
            background: `${PRIMARY}22`,
            border: `1px solid ${GLASS_BORDER}`,
          }}
        >
          <Gift className="w-5 h-5" style={{ color: PRIMARY }} />
        </div>
      </div>
    </DarkGlass>
  );
}

const purpleBase = PRIMARY_DARK;
const purpleLight = PRIMARY;

function RankingBarChart({ data }: { data: ClienteResgateRanking[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="pontosGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={purpleBase} stopOpacity={0.95} />
            <stop offset="100%" stopColor={purpleLight} stopOpacity={0.98} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis type="number" tick={{ fill: "#ccc" }} />
        <YAxis
          type="category"
          dataKey="nome"
          tick={{ fill: "#fff", fontSize: 12 }}
          width={180}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(20,20,30,0.9)",
            borderRadius: 8,
            border: `1px solid rgba(255,255,255,0.06)`,
            color: TEXT_LIGHT,
          }}
          formatter={(value) => [
            `${value.toLocaleString("pt-BR")} pts`,
            "Pontos",
          ]}
        />

        <Bar
          dataKey="total_pontos_resgatados"
          fill="url(#pontosGradient)"
          radius={[8, 8, 8, 8]}
        >
          <LabelList
            dataKey="total_pontos_resgatados"
            position="right"
            style={{ fill: "#fff", fontSize: 12, fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const donutColors = ["#7c3aed", "#a855f7", "#c4b5fd", "#60a5fa", "#34d399"];

function RankingDonutChart({ data }: { data: ClienteResgateRanking[] }) {
  const chartData = data.map((c) => ({
    name: c.nome,
    value: c.total_pontos_resgatados,
  }));

  const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

  if (total === 0)
    return <p className="text-sm text-zinc-300">Não há dados suficientes.</p>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          innerRadius={56}
          outerRadius={86}
          paddingAngle={3}
        >
          {chartData.map((_, i) => (
            <Cell
              key={i}
              fill={donutColors[i % donutColors.length]}
              stroke="#0b0b0b"
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(20,20,30,0.9)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#fff",
          }}
          itemStyle={{ color: "#fff" }}
          labelStyle={{ color: "#fff" }}
          labelFormatter={() => ""}
          formatter={(value: any, _name: any, props: any) => {
            const nome = props?.payload?.name ?? "";
            return [`${value.toLocaleString("pt-BR")} pts`, nome];
          }}
        />

        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ color: TEXT_LIGHT, fontSize: 12 }}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function RankingTable({ data }: { data: ClienteResgateRanking[] }) {
  const [sortField, setSortField] = useState<
    "nome" | "total_pontos_resgatados"
  >("total_pontos_resgatados");

  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal =
        sortField === "nome" ? a.nome.toLowerCase() : a.total_pontos_resgatados;

      const bVal =
        sortField === "nome" ? b.nome.toLowerCase() : b.total_pontos_resgatados;

      if (sortDir === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [data, sortField, sortDir]);

  function handleSort(field: "nome" | "total_pontos_resgatados") {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir(field === "nome" ? "asc" : "desc");
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-white table-auto border-collapse">
        <thead
          className="sticky top-0 z-10"
          style={{ background: "rgba(10,10,14,0.45)" }}
        >
          <tr className="text-xs uppercase tracking-wider font-semibold text-zinc-300">
            <th className="py-3 px-3 text-left w-16">Rank</th>

            <th className="py-3 px-3 text-left">
              <button
                onClick={() => handleSort("nome")}
                className={cn(
                  "flex items-center gap-2",
                  sortField === "nome" && "text-purple-300"
                )}
              >
                Nome
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>

            <th className="py-3 px-3 text-left">CPF</th>

            <th className="py-3 px-3 text-right">
              <button
                onClick={() => handleSort("total_pontos_resgatados")}
                className={cn(
                  "flex items-center justify-end gap-2",
                  sortField === "total_pontos_resgatados" && "text-purple-300"
                )}
              >
                Pontos
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((c, idx) => {
            const rank = idx + 1;

            return (
              <tr
                key={c.id_cliente}
                className={cn(
                  "transition-colors hover:bg-zinc-900/40",
                  idx % 2 === 0 ? "bg-zinc-900/20" : "bg-transparent"
                )}
              >
                <td className="py-3 px-3 text-lg">
                  {rank === 1
                    ? "🥇"
                    : rank === 2
                      ? "🥈"
                      : rank === 3
                        ? "🥉"
                        : rank}
                </td>

                <td className="py-3 px-3">{c.nome}</td>

                <td className="py-3 px-3 text-zinc-300">{formatCPF(c.cpf)}</td>

                <td
                  className="py-3 px-3 text-right font-bold"
                  style={{ color: PRIMARY }}
                >
                  {c.total_pontos_resgatados.toLocaleString("pt-BR")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3 p-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-10 rounded-md" />
      ))}
    </div>
  );
}

export default RankingResgatePage;
