import { Combobox } from "@/components/Combobox";
import {
  useQueryDiretores,
  useQueryFilmesDiretor,
  useQueryGeneroDiretor,
} from "@/features/filme/api/useFilmeQueries";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app/filmes/diretores")({
  component: RouteComponent,
});

type DiretoresComboboxProps = {
  diretor: string;
  setDiretor: (value: string) => void;
};

function DiretoresCombobox({ diretor, setDiretor }: DiretoresComboboxProps) {
  const { data } = useQueryDiretores();
  const options = data?.map?.((d) => ({ value: d.nome, label: d.nome }));

  return <Combobox value={diretor} setValue={setDiretor} options={options} />;
}

function RouteComponent() {
  const [diretor, setDiretor] = useState("");

  const filmesQuery = useQueryFilmesDiretor(
    {
      diretor,
    },
    { enabled: !!diretor }
  );
  const generoQuery = useQueryGeneroDiretor(
    {
      diretor,
    },
    { enabled: !!diretor }
  );

  return (
    <div>
      <DiretoresCombobox diretor={diretor} setDiretor={setDiretor} />

      {!generoQuery.isLoading &&
        generoQuery.data &&
        generoQuery.data.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              Gêneros deste diretor
            </h2>
            <div className="flex flex-wrap gap-2">
              {generoQuery.data.map((cartaz) => (
                <span
                  key={cartaz.genero}
                  className="bg-indigo-600/20 text-indigo-400 border border-indigo-500 px-3 py-1 rounded-full text-xs font-medium cursor-default select-none"
                >
                  {cartaz.genero}
                </span>
              ))}
            </div>
          </div>
        )}

      {!filmesQuery.isLoading && filmesQuery.data && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white mb-2">
            Filmes deste diretor
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2 w-full">
            {filmesQuery.data.map((cartaz) => (
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
      )}
    </div>
  );
}
