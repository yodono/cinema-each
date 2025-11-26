import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useQueryClientesSemMeia } from "@/features/clientes/api/useClientesQueries";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY = "#8b5cf6";

function exportCSV(rows: any[]) {
  if (!rows || rows.length === 0) return;

  const header = "nome,cpf,email\n";
  const csv =
    header + rows.map((r) => `${r.nome},${r.cpf},${r.email}`).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "clientes-sem-meia.csv";
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
          style={{
            background: `${PRIMARY}22`,
          }}
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

function ClientesTable({ data }: any) {
  if (!data || data.length === 0) {
    return (
      <p className="p-6 text-muted-foreground text-center">
        Nenhum cliente encontrado.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/20 dark:border-white/10">
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-purple-100 via-white to-purple-50 dark:from-purple-900/40 dark:via-zinc-900 dark:to-purple-900/40">
          <tr className="border-b border-zinc-300/40 dark:border-zinc-700/40">
            <th className="py-3 px-4 text-left font-semibold">Nome</th>
            <th className="py-3 px-4 text-left font-semibold">CPF</th>
            <th className="py-3 px-4 text-left font-semibold">Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((c: any, i: number) => (
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
              <td className="py-3 px-4">{c.nome}</td>
              <td className="py-3 px-4">{c.cpf}</td>
              <td className="py-3 px-4">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Route = createFileRoute("/app/clientes/sem-meia")({
  component: ClientesSemMeiaPage,
});

function ClientesSemMeiaPage() {
  const q = useQueryClientesSemMeia();
  const data = q.data ?? [];
  const total = data.length;

  return (
    <>
      {!q.isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
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
              onClick={() => exportCSV(data)}
              className="text-white px-5 py-2 rounded-xl font-medium shadow-lg transition-all hover:scale-105 active:scale-95"
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
          {q.isLoading ? <SkeletonList /> : <ClientesTable data={data} />}
        </CardContent>
      </Card>
    </>
  );
}
