import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { useQueryFilmesGenero } from "@/features/filme/api/useFilmeQueries";
import type { FilmeCartazGenero } from "@/types/filmeTypes";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app/filmes/cartaz")({
  component: RouteComponent,
});

function groupByGenero(filmes: FilmeCartazGenero[]) {
  return filmes.reduce<Record<string, FilmeCartazGenero[]>>((acc, filme) => {
    if (!acc[filme.genero]) acc[filme.genero] = [];
    acc[filme.genero].push(filme);
    return acc;
  }, {});
}

function RouteComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));
  const [genero] = useState<string | undefined>();
  const { data, isLoading } = useQueryFilmesGenero(
    {
      dt_hoje: date?.toISOString().split("T")[0],
      genero_filme: genero,
    },
    { enabled: !!date }
  );

  const clear = () => {
    setDate(undefined);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <DatePicker date={date} onChange={setDate} />
        <Button
          variant={date ? "default" : "outline"}
          onClick={() => clear()}
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground"
        >
          Limpar
        </Button>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-6">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex flex-col gap-4 w-full">
                <div className="h-8 w-40 bg-accent rounded-md animate-pulse" />

                <div className="flex gap-4 overflow-x-auto pb-2 w-full">
                  {Array(5)
                    .fill(null)
                    .map((_, j) => (
                      <div
                        key={j}
                        className="min-w-[200px] flex-shrink-0 rounded-2xl overflow-hidden shadow-l border border-accent animate-pulse"
                      >
                        <div className="w-full h-48 bg-accent" />
                        <div className="p-3 space-y-2">
                          <div className="h-5 w-3/4 bg-accent rounded" />
                          <div className="h-4 w-full bg-accent rounded" />
                          <div className="h-4 w-1/4 bg-accent rounded" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-6">
          {Object.entries(groupByGenero(data || [])).map(([genero, filmes]) => (
            <div key={genero} className="flex flex-col gap-4 w-full">
              <h2 className="text-2xl font-bold text-white">{genero}</h2>

              <div className="flex gap-4 overflow-x-auto pb-2 w-full">
                {filmes.map((cartaz) => (
                  <div
                    key={cartaz.titulo}
                    className="min-w-[200px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg bg-zinc-900 text-white border border-zinc-800"
                  >
                    <img
                      src="https://m.media-amazon.com/images/M/MV5BYmZmMmM4OTYtMDkyNi00ZDI5LThiODItNzhlZGI3ZDJmZDZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                      alt={cartaz.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3 space-y-2">
                      <h3 className="text-lg font-semibold">{cartaz.titulo}</h3>
                      <p className="text-sm text-zinc-300">{cartaz.sinopse}</p>
                      <span className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-2 py-1 rounded-full text-xs">
                        {cartaz.classificacao_etaria}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
