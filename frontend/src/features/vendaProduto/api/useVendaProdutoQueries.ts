import { useQuery } from "@tanstack/react-query";
import {
  getFormaPagamento,
  getVendasSnacks,
  getReceitaColecionaveis,
} from "./vendaProdutoService";

// RF08 - FORMAS DE PAGAMENTO
export function useQueryFormaPagamento() {
  return useQuery({
    queryKey: ["venda", "pagamento"],
    queryFn: getFormaPagamento,
  });
}

// RF26 - Vendas de Snacks
export function useQueryVendaSnacks() {
  return useQuery({
    queryKey: ["venda", "snacks"],
    queryFn: () => getVendasSnacks(),
  });
}

// RF27 - Receita de Colecionáveis
export function useQueryReceitaColecionaveis() {
  return useQuery({
    queryKey: ["venda", "colecionaveis"],
    queryFn: getReceitaColecionaveis,
  });
}
