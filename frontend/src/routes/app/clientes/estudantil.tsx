import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap, Search, ArrowUpDown, Table2 } from "lucide-react";
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
import { useQueryPublicoEstudantil } from "@/features/clientes/api/useClientesQueries";
import { cn } from "@/lib/utils";
import { DarkGlass } from "@/components/DarkGlass";
import { GlassStat } from "@/components/GlassStat";

const PRIMARY = "#a78bfa"; // violeta pastel roxinho

export const Route = createFileRoute("/app/clientes/estudantil")({
  component: PublicoEstudantilPage,
});

type PublicoEstudantilData = {
  titulo: string;
  total_meia_entrada: number;
  total_ingressos: number;
  percentual_meia_entrada: number;
};

function exportCSV(rows: PublicoEstudantilData[]) {
  if (!rows || rows.length === 0) return;
  const header = "titulo,total_meia,total_ingressos,percentual_meia\n";
  const csv =
    header +
    rows
      .map(
        (r) =>
          `${escapeCsv(r.titulo)},${r.total_meia_entrada},${r.total_ingressos},${r.percentual_meia_entrada}`
      )
      .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "publico-estudantil.csv";
  a.click();
}

function escapeCsv(v: string) {
  if (v.includes(",") || v.includes('"')) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function DateInput({ label, value, setValue }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-zinc-300 mb-1">{label}</label>
      <input
        type="date"
        className="h-10 px-3 rounded-lg border bg-zinc-900 text-white"
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value || undefined)}
      />
    </div>
  );
}

function TableEstudantil({
  data,
  sortField,
  sortDir,
  setSortField,
  setSortDir,
}: any) {
  if (!data || data.length === 0) {
    return (
      <p className="p-6 text-center text-zinc-400">
        Nenhum registro encontrado.
      </p>
    );
  }

  function handleSort(field: keyof PublicoEstudantilData) {
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
            <th className="py-3 px-4 text-left font-semibold">#</th>

            <th className="py-3 px-4 text-left font-semibold">
              <button
                onClick={() => handleSort("titulo")}
                className={cn(
                  "flex items-center gap-2 hover:text-purple-300 transition",
                  sortField === "titulo" && "text-purple-300"
                )}
              >
                Filme
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>

            <th className="py-3 px-4 text-right font-semibold">
              <button
                onClick={() => handleSort("total_meia_entrada")}
                className={cn(
                  "flex items-center justify-end gap-2 hover:text-purple-300 transition",
                  sortField === "total_meia_entrada" && "text-purple-300"
                )}
              >
                Meias
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>

            <th className="py-3 px-4 text-right font-semibold">
              <button
                onClick={() => handleSort("total_ingressos")}
                className={cn(
                  "flex items-center justify-end gap-2 hover:text-purple-300 transition",
                  sortField === "total_ingressos" && "text-purple-300"
                )}
              >
                Total
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>

            <th className="py-3 px-4 text-right font-semibold">
              <button
                onClick={() => handleSort("percentual_meia_entrada")}
                className={cn(
                  "flex items-center justify-end gap-2 hover:text-purple-300 transition",
                  sortField === "percentual_meia_entrada" && "text-purple-300"
                )}
              >
                % Estudantil
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((f: PublicoEstudantilData, i: number) => (
            <tr
              key={i}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td className="py-3 px-4">{i + 1}</td>
              <td className="py-3 px-4">{f.titulo}</td>
              <td className="py-3 px-4 text-right">{f.total_meia_entrada}</td>
              <td className="py-3 px-4 text-right">{f.total_ingressos}</td>
              <td className="py-3 px-4 text-right font-semibold text-purple-300">
                {f.percentual_meia_entrada.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PublicoEstudantilPage() {
  const [inicio, setInicio] = useState<string>();
  const [fim, setFim] = useState<string>();

  const [sortField, setSortField] = useState<keyof PublicoEstudantilData>(
    "percentual_meia_entrada"
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const q = useQueryPublicoEstudantil({ inicio, fim });

  const dataOrdenada = useMemo(() => {
    if (!q.data) return [];
    return [...q.data].sort(
      (a, b) => b.total_meia_entrada - a.total_meia_entrada
    );
  }, [q.data]);

  const destaque = dataOrdenada[0];

  return (
    <>
      <DarkGlass>
        <div className="flex gap-6 items-end flex-wrap">
          <DateInput label="Início" value={inicio} setValue={setInicio} />
          <DateInput label="Fim" value={fim} setValue={setFim} />

          <Button
            onClick={() => q.refetch()}
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
          <Skeleton className="w-full h-[400px] rounded-xl" />
          <Skeleton className="w-full h-[320px] rounded-xl" />
        </div>
      )}
      {!q.isLoading && dataOrdenada.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          <GlassStat
            title="Total de Filmes"
            value={q.data ? q.data.length : 0}
          />
          <GlassStat
            title="Total de Meias"
            value={dataOrdenada.reduce((s, r) => s + r.total_meia_entrada, 0)}
          />
          <GlassStat
            title="Top (Meias)"
            value={destaque ? destaque.titulo : "-"}
          />
        </div>
      )}
      {!q.isLoading && dataOrdenada.length > 0 && (
        <DarkGlass>
          <CardHeader className="px-2 pb-4">
            <CardTitle className="text-xl font-semibold text-white">
              Meias-Entrada por Filme
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[500px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataOrdenada}
                layout="vertical"
                margin={{ left: 20, right: 30, top: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="barEst" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={1} />
                    <stop offset="100%" stopColor="#4c1d95" stopOpacity={1} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="rgba(255,255,255,0.1)"
                  vertical={false}
                />

                <XAxis
                  type="number"
                  tick={{ fill: "#ccc" }}
                  domain={[0, "dataMax + 3"]}
                />

                <YAxis
                  type="category"
                  dataKey="titulo"
                  tick={{ fill: "#ddd" }}
                  width={200}
                />

                <Tooltip
                  contentStyle={{
                    background: "rgba(20,20,30,0.9)",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  labelStyle={{ color: "white" }}
                />

                <Bar
                  dataKey="total_meia_entrada"
                  fill="url(#barEst)"
                  radius={[6, 6, 6, 6]}
                >
                  <LabelList
                    dataKey="total_meia_entrada"
                    position="right"
                    style={{
                      fill: "white",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </DarkGlass>
      )}
      <div className="flex justify-end">
        <Button
          onClick={() => exportCSV(dataOrdenada)}
          disabled={q.isLoading || dataOrdenada.length === 0}
          className="px-6 py-2 text-white rounded-xl shadow-md hover:scale-105 transition"
          style={{ background: PRIMARY }}
        >
          <Table2 className="w-4 h-4 mr-2" />
          Exportar CSV
        </Button>
      </div>
      <DarkGlass>
        <CardHeader className="p-0 pb-4 mb-3 border-b border-white/10">
          <CardTitle className="text-xl font-semibold text-white">
            Lista Completa
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!q.isLoading && (
            <TableEstudantil
              data={dataOrdenada}
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

export default PublicoEstudantilPage;
