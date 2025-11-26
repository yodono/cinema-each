import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQueryPreEstreias } from "@/features/sessao/api/useSessaoQueries";
import { createFileRoute } from "@tanstack/react-router";
import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/DateRangePicker";
import { mapMovieNameId } from "@/lib/utils";

export const Route = createFileRoute("/app/sessoes/pre-estreias")({
  component: RouteComponent,
});

function RouteComponent() {
  const [range, setRange] = useState<DateRange | undefined>();

  const { data, isLoading } = useQueryPreEstreias(
    {
      inicio: range?.from?.toISOString().split("T")[0],
      fim: range?.to?.toISOString().split("T")[0],
    },
    {
      enabled: !!range,
    }
  );

  const clear = () => {
    setRange(undefined);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <DateRangePicker range={range} onChange={setRange} />
        <Button
          variant={range ? "default" : "outline"}
          onClick={() => clear()}
          data-empty={!range}
          className="data-[empty=true]:text-muted-foreground"
        >
          Limpar
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
          ))}

        {!isLoading &&
          data?.map((sessao) => (
            <div
              key={sessao.id_sessao}
              className="flex space-y-2 rounded-2xl overflow-hidden shadow-lg bg-zinc-900 text-white border border-zinc-800"
            >
              <img
                src={`/images/filme-${mapMovieNameId(sessao.filme)}.jpg`}
                alt={sessao.filme}
                className="w-32 h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://m.media-amazon.com/images/M/MV5BYmZmMmM4OTYtMDkyNi00ZDI5LThiODItNzhlZGI3ZDJmZDZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";
                }}
              />

              {/* Content */}
              <div className="p-4 space-y-3 flex-1">
                <h2 className="leading-none font-semibold text-lg">
                  {sessao.filme}
                </h2>

                <div className="space-y-1 text-zinc-300">
                  <p>
                    <b className="text-white">Data:</b>{" "}
                    {new Date(sessao.data).toLocaleDateString("pt-BR")}
                  </p>

                  <p>
                    <b className="text-white">Horário:</b>{" "}
                    {sessao.horario?.slice(0, 5)}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-sm">
                    Sala {sessao.sala}
                  </span>

                  <span className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-sm">
                    {sessao.tipo_exibicao}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
