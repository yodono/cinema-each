import { useQuery } from "@tanstack/react-query";
import {
  getPreEstreias,
  getVendasPorSessao,
  getBilheteria,
  getTaxaOcupacao,
  getSessoesMaisLotadas,
} from "./sessaoService";

export function useQueryPreEstreias(params?: {
  inicio?: string;
  fim?: string;
}) {
  return useQuery({
    queryKey: ["sessoes", "pre-estreias", params],
    queryFn: () => getPreEstreias(params),
  });
}

export function useQueryVendasPorSessao() {
  return useQuery({
    queryKey: ["sessoes", "vendas"],
    queryFn: getVendasPorSessao,
  });
}

export function useQueryBilheteria() {
  return useQuery({
    queryKey: ["sessoes", "bilheteria"],
    queryFn: getBilheteria,
  });
}

export function useQueryTaxaOcupacao() {
  return useQuery({
    queryKey: ["sessoes", "ocupacao"],
    queryFn: getTaxaOcupacao,
  });
}

export function useQuerySessoesMaisLotadas() {
  return useQuery({
    queryKey: ["sessoes", "mais-lotadas"],
    queryFn: getSessoesMaisLotadas,
  });
}
