import { get } from "../../../api/api";
import {
  type FormaPagamento,
  type VendaSnacks,
  type ReceitaColecionaveis,
} from "../../../types/vendaProdutoTypes";

// RF08 - FORMAS DE PAGAMENTO
export async function getFormaPagamento(): Promise<FormaPagamento[]> {
  return await get("/venda/pagamento");
}

// RF26 - Vendas de Snacks
export async function getVendasSnacks(): Promise<VendaSnacks[]> {
  return await get(`/venda/snacks`);
}

// RF27 - Receita de Colecionáveis
export async function getReceitaColecionaveis(): Promise<
  ReceitaColecionaveis[]
> {
  return await get("/venda/colecionaveis");
}
