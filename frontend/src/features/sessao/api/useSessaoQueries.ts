import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import {
  getPreEstreias,
  getVendasPorSessao,
  getBilheteria,
  getTaxaOcupacao,
  getSessoesMaisLotadas,
  getBilheteriaPorSala,
  getFilmesMaisSessoes,
  getHorariosPopulares,
  getVendasPorDiaSemana,
} from "./sessaoService";
import type {
  BilheteriaFilme,
  BilheteriaPorSala,
  FilmeMaisSessoes,
  HorarioPopular,
  OcupacaoSessao,
  Sessao,
  VendasDiaSemana,
  VendaSessao,
} from "@/types/sessaoTypes";

export type QueryOptionsWithoutKey<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError>,
  "queryKey" | "queryFn"
>;

export function useQueryPreEstreias(
  params?: {
    inicio?: string;
    fim?: string;
  },
  options?: QueryOptionsWithoutKey<Sessao[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "pre-estreias", params],
    queryFn: () => getPreEstreias(params),
    ...options,
  });
}

export function useQueryVendasPorSessao(
  options?: QueryOptionsWithoutKey<VendaSessao[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "vendas"],
    queryFn: getVendasPorSessao,
    ...options,
  });
}

export function useQueryBilheteria(
  options?: QueryOptionsWithoutKey<BilheteriaFilme[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "bilheteria"],
    queryFn: getBilheteria,
    ...options,
  });
}

export function useQueryTaxaOcupacao(
  options?: QueryOptionsWithoutKey<OcupacaoSessao[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "ocupacao"],
    queryFn: getTaxaOcupacao,
    ...options,
  });
}

export function useQuerySessoesMaisLotadas(
  options?: QueryOptionsWithoutKey<OcupacaoSessao[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "mais-lotadas"],
    queryFn: getSessoesMaisLotadas,
    ...options,
  });
}

export function useQueryVendasPorDiaSemana(
  options?: QueryOptionsWithoutKey<VendasDiaSemana[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "vendas-por-dia"],
    queryFn: getVendasPorDiaSemana,
    ...options,
  });
}

export function useQueryHorariosPopulares(
  options?: QueryOptionsWithoutKey<HorarioPopular[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "horarios-populares"],
    queryFn: getHorariosPopulares,
    ...options,
  });
}

export function useQueryFilmesMaisSessoes(
  options?: QueryOptionsWithoutKey<FilmeMaisSessoes[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "filmes-mais-sessoes"],
    queryFn: getFilmesMaisSessoes,
    ...options,
  });
}

export function useQueryBilheteriaPorSala(
  options?: QueryOptionsWithoutKey<BilheteriaPorSala[], Error>
) {
  return useQuery({
    queryKey: ["sessoes", "bilheteria-por-sala"],
    queryFn: getBilheteriaPorSala,
    ...options,
  });
}
