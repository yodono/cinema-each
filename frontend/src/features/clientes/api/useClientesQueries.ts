import { useQuery } from "@tanstack/react-query";
import {
  getRankingClientesPorCompra,
  getRankingClientesPorResgate,
  getIdadeMediaPorFilme,
  getIdadeMediaPorGenero,
  getPublicoEstudantil,
  getClientesSemMeia,
  getClientesPorFilme,
  getGenerosMaisAssistidos,
} from "./clientesService";

// RF6
export function useQueryRankingClientesPorCompra(params?: {
  inicio?: string;
  fim?: string;
}) {
  return useQuery({
    queryKey: ["clientes", "ranking-compras", params],
    queryFn: () => getRankingClientesPorCompra(params),
  });
}

// RF29
export function useQueryRankingClientesPorResgate() {
  return useQuery({
    queryKey: ["clientes", "ranking-resgates"],
    queryFn: getRankingClientesPorResgate,
  });
}

// RF 17
export function useQueryIdadeMediaPorFilme() {
  return useQuery({
    queryKey: ["publico", "idade-media", "filmes"],
    queryFn: getIdadeMediaPorFilme,
  });
}

// RF7
export function useQueryIdadeMediaPorGenero() {
  return useQuery({
    queryKey: ["publico", "idade-media", "generos"],
    queryFn: getIdadeMediaPorGenero,
  });
}

// RF11
export function useQueryPublicoEstudantil(params?: {
  inicio?: string;
  fim?: string;
}) {
  return useQuery({
    queryKey: ["publico", "estudantil", params],
    queryFn: () => getPublicoEstudantil(params),
  });
}

// RF14
export function useQueryClientesSemMeia() {
  return useQuery({
    queryKey: ["clientes", "sem-meia"],
    queryFn: getClientesSemMeia,
  });
}

// RF10
export function useQueryClientesPorFilme(idFilme?: number) {
  return useQuery({
    queryKey: ["clientes", "por-filme", idFilme],
    queryFn: () => getClientesPorFilme(idFilme as number), 
    enabled: idFilme != null && idFilme > 0,
  });
}

// RF 19
export function useQueryGenerosMaisAssistidos(params?: {
  inicio?: string;
  fim?: string;
}) {
  return useQuery({
    queryKey: ["publico", "generos-mensal", params],
    queryFn: () => getGenerosMaisAssistidos(params),
  });
}