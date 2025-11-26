import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Users, Search, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClientesPorFilme } from "@/features/clientes/api/useClientesQueries";

const PRIMARY = "#8b5cf6";

export const Route = createFileRoute("/app/clientes/por-filme")({
  component: ClientesPorFilmePage,
});

type SortField = "nome" | "cpf";

interface ClienteData {
  id_cliente: number;
  nome: string;
  cpf: string;
  email: string;
}

function exportCSV(rows: ClienteData[]) {
  if (!rows || rows.length === 0) return;

  const header = "id_cliente,nome,cpf,email\n";
  const csv =
    header +
    rows
      .map((r) => `${r.id_cliente},${r.nome},${r.cpf},${r.email ?? ""}`)
      .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clientes-por-filme.csv";
  a.click();
}

function MiniCard({ title, value }: { title: string; value: any }) {
  return (
    <Card className="p-6 rounded-2xl shadow-xl border border-white/20 dark:border-white/10 backdrop-blur-xl bg-gradient-to-br from-white/60 to-white/30 dark:from-zinc-900/40 dark:to-zinc-900/10 hover:scale-[1.02] transition-all">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide">
          {title}
        </CardTitle>

        <div
          className="p-3 rounded-xl shadow-sm"
          style={{ background: `${PRIMARY}22` }}
        >
          <Users className="w-6 h-6" style={{ color: PRIMARY }} />
        </div>
      </div>

      <p className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-800 dark:text-zinc-50">
        {value}
      </p>
    </Card>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-10 rounded-lg" />
      ))}
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

function ClientesTable({
  data,
  sortField,
  sortDir,
  setSortField,
  setSortDir,
}: {
  data: ClienteData[];
  sortField: SortField;
  sortDir: "asc" | "desc";
  setSortField: (f: SortField) => void;
  setSortDir: (d: "asc" | "desc") => void;
}) {
  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/20 dark:border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-purple-100 via-white to-purple-50 dark:from-purple-900/40 dark:via-zinc-900 dark:to-purple-900/40">
          <tr className="border-b border-zinc-300/40 dark:border-zinc-700/40">
            <th className="py-3 px-4 text-left font-semibold">#</th>

            <th className="py-3 px-4 text-left font-semibold">
              <button
                onClick={() => handleSort("nome")}
                className={cn(
                  "flex items-center gap-1 hover:text-purple-700 dark:hover:text-purple-300 transition-colors",
                  sortField === "nome" && "text-purple-700 dark:text-purple-300"
                )}
              >
                Nome
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>

            <th className="py-3 px-4 text-left font-semibold">
              <button
                onClick={() => handleSort("cpf")}
                className={cn(
                  "flex items-center gap-1 hover:text-purple-700 dark:hover:text-purple-300 transition-colors",
                  sortField === "cpf" && "text-purple-700 dark:text-purple-300"
                )}
              >
                CPF
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>

            <th className="py-3 px-4 text-left font-semibold">Email</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c, i) => (
            <tr
              key={c.id_cliente}
              className={cn(
                "transition-colors",
                i % 2 === 0
                  ? "bg-white/40 dark:bg-zinc-900/20"
                  : "bg-white/10 dark:bg-zinc-900/5",
                "hover:bg-purple-100/60 dark:hover:bg-purple-900/20"
              )}
            >
              <td className="py-3 px-4">{i + 1}</td>
              <td className="py-3 px-4">{c.nome}</td>
              <td className="py-3 px-4">{formatCPF(c.cpf)}</td>
              <td className="py-3 px-4">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClientesPorFilmePage() {
  const [idFilmeInput, setIdFilmeInput] = useState("");
  const [idFilmeFiltro, setIdFilmeFiltro] = useState<number | undefined>();

  const q = useQueryClientesPorFilme(idFilmeFiltro);

  function aplicarFiltro() {
    const id = Number(idFilmeInput);
    setIdFilmeFiltro(id > 0 ? id : undefined);
  }

  const [sortField, setSortField] = useState<SortField>("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!q.data) return [];

    const copy = [...q.data];
    copy.sort((a, b) => {
      const aVal = sortField === "nome" ? a.nome : a.cpf;
      const bVal = sortField === "nome" ? b.nome : b.cpf;

      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    return copy;
  }, [q.data, sortField, sortDir]);

  const total = sortedData.length;

  return (
    <>
      {/* INPUT + AÇÕES */}
      <Card className="shadow-xl border border-white/20 dark:border-white/10 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40">
        <CardHeader className="p-6 border-b border-white/20 dark:border-white/10">
          <CardTitle className="text-2xl font-bold">
            Buscar clientes por ID do filme
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-muted-foreground">
                ID do Filme
              </label>

              <input
                type="number"
                value={idFilmeInput}
                onChange={(e) => setIdFilmeInput(e.target.value)}
                placeholder="Ex: 123"
                className="h-10 px-3 py-2 text-sm border border-input rounded-md bg-background w-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 transition-colors"
              />
            </div>

            <Button
              onClick={aplicarFiltro}
              className="h-10 px-4 gap-1 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95"
              style={{
                background: PRIMARY,
                boxShadow: `0 0 12px ${PRIMARY}77`,
              }}
            >
              <Search className="w-4 h-4" />
              Buscar
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setIdFilmeInput("");
                setIdFilmeFiltro(undefined);
              }}
              className="h-10 px-4 rounded-xl"
            >
              Limpar Filtro
            </Button>
          </div>
        </CardContent>
      </Card>
      {idFilmeFiltro !== undefined && !q.isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          <MiniCard title="ID do Filme" value={`#${idFilmeFiltro}`} />
          <MiniCard title="Total Encontrado" value={total} />
        </div>
      )}
      <Card className="shadow-xl border border-white/20 dark:border-white/10 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-zinc-900/40">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-white/20 dark:border-white/10">
          <CardTitle className="text-2xl font-bold">
            Lista de Clientes
          </CardTitle>

          {!q.isLoading && total > 0 && (
            <Button
              onClick={() => exportCSV(sortedData)}
              className="text-white px-5 py-2 rounded-xl font-medium shadow-lg hover:scale-105 active:scale-95"
              style={{
                background: PRIMARY,
                boxShadow: `0 0 15px ${PRIMARY}88`,
              }}
            >
              Exportar CSV ({total})
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-0">
          {q.isLoading ? (
            <SkeletonList />
          ) : total === 0 ? (
            <p className="p-6 text-center text-muted-foreground">
              Nenhum cliente encontrado para o filme #{idFilmeFiltro}.
            </p>
          ) : (
            <ClientesTable
              data={sortedData}
              sortField={sortField}
              sortDir={sortDir}
              setSortField={setSortField}
              setSortDir={setSortDir}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
