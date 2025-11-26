import { useQuery } from "@tanstack/react-query";
import {
  getFilmesEmCartaz,
  getFilmePorDiretor,
  getDiretorGenero,
  getAtorPorFilme,
  getAtoresPopulares,
  getDiretores,
} from "./filmeService";
import type { QueryOptionsWithoutKey } from "@/features/sessao/api/useSessaoQueries";
import type {
  Diretor,
  Filme_Diretor,
  FilmeCartazGenero,
  Genero_Diretor,
} from "@/types/filmeTypes";

// RF09 - Filmes em Cartaz por Gênero
export function useQueryFilmesGenero(
  params?: {
    genero_filme?: string;
    dt_hoje?: string;
  },
  options?: QueryOptionsWithoutKey<FilmeCartazGenero[], Error>
) {
  return useQuery({
    queryKey: ["filmes", "filmes-cartaz", params],
    queryFn: () => getFilmesEmCartaz(params),
    ...options,
  });
}

// RF21 - Filmes por Diretor
export function useQueryFilmesDiretor(
  params?: { diretor?: string },
  options?: QueryOptionsWithoutKey<Filme_Diretor[], Error>
) {
  return useQuery({
    queryKey: ["filmes", "filme-diretor", params],
    queryFn: () => getFilmePorDiretor(params),
    ...options,
  });
}

// RF23 - Gênero Mais Comum por Diretor
export function useQueryGeneroDiretor(
  params?: { diretor?: string },
  options?: QueryOptionsWithoutKey<Genero_Diretor[], Error>
) {
  return useQuery({
    queryKey: ["filmes", "/diretor-genero", params],
    queryFn: () => getDiretorGenero(params),
    ...options,
  });
}

// RF22 - Atores por Filme
export function useQueryAtorFilme(params?: { filme?: string }) {
  return useQuery({
    queryKey: ["filmes", "/ator-filme", params],
    queryFn: () => getAtorPorFilme(params),
  });
}

// RF25 - Ranking de Atores Populares
export function useQueryAtoresPopulares() {
  return useQuery({
    queryKey: ["filmes", "atores-populares"],
    queryFn: getAtoresPopulares,
  });
}

export function useQueryDiretores(
  options?: QueryOptionsWithoutKey<Diretor[], Error>
) {
  return useQuery({
    queryKey: ["filmes", "diretores"],
    queryFn: () => getDiretores(),
    ...options,
  });
}
