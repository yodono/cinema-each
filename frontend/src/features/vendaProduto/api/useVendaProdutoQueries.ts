import { useQuery } from "@tanstack/react-query";
import {
  getFormaPagamento,
  getVendasSnacks,
  getReceitaColecionaveis,
} from "./vendaProdutoService";

// RF08 - FORMAS DE PAGAMENTO
export function useQueryFormaPagamento() {
  return useQuery({
    queryKey: ["venda-produto", "pagamento"],
    queryFn: getFormaPagamento,
  });
}

// RF26 - Vendas de Snacks
export function useQueryVendaSnacks(params?: { data?: string; dat2?: string }) {
  return useQuery({
    queryKey: ["venda-produto", "vendas-snacks", params],
    queryFn: () => getVendasSnacks(params),
  });
}

// RF27 - Receita de Colecionáveis
export function useQueryRceitaColecionaveis() {
  return useQuery({
    queryKey: ["venda-produto", "receita-colecionaveis"],
    queryFn: getReceitaColecionaveis,
  });
}
