import { get } from "../../../api/api";
import {
  type FormaPagamento,
  type VendaSnacks,
  type ReceitaColecionaveis,
} from "../../../types/vendaProdutoTypes";


// RF08 - FORMAS DE PAGAMENTO
export async function getFormaPagamento(): Promise<FormaPagamento[]> {
  return await get("/venda-produto/forma-pagamento");
}

// RF26 - Vendas de Snacks
export async function getVendasSnacks(params?: {
  data?: string;
  data2?: string;
}): Promise<VendaSnacks[]> {
  const query = params
    ? `?data=${params.data ?? ""}&data2=${params.data2 ?? ""}`
    : "";
  return await get(`/venda-produto/vendas-snacks${query}`);
}

// RF27 - Receita de Colecionáveis
export async function getReceitaColecionaveis(): Promise<ReceitaColecionaveis[]> {
  return await get("/venda-produto/receita-colecionaveis");
}
