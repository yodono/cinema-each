import { useQuery } from "@tanstack/react-query";
import {
  getDuracaoPorGenero,
  getBilheteriaPorGenero,
  getBilheteriaDiretor,
} from "./estatisticaRankingService";
import type { QueryOptionsWithoutKey } from "@/features/sessao/api/useSessaoQueries";
import type { DuracaoGenero } from "@/types/estatisticaRankingTypes";

// RF12 - Comparativo de Bilheteria por Gênero
export function useQueryBilheteriaGenero() {
  return useQuery({
    queryKey: ["estatistica-ranking", "bilheteria-genero"],
    queryFn: getBilheteriaPorGenero,
  });
}

// RF15 - Duração Média por Gênero
export function useQueryDuracaoGenero(
  params?: {
    dt_hoje?: string;
  },
  options?: QueryOptionsWithoutKey<DuracaoGenero[], Error>
) {
  return useQuery({
    queryKey: ["estatistica-ranking", "duracao-genero", params],
    queryFn: () => getDuracaoPorGenero(params),
    ...options,
  });
}

// RF24 - Bilheteria por Diretor
export function useQueryBilheteriaDiretor(params?: { diretor?: string }) {
  return useQuery({
    queryKey: ["estatistica-ranking", "bilheteria-diretor", params],
    queryFn: () => getBilheteriaDiretor(params),
  });
}
