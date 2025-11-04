import { get } from "../../../api/api";
import {
  type Sessao,
  type VendaSessao,
  type BilheteriaFilme,
  type OcupacaoSessao,
} from "../../../types/sessaoTypes";

// RF01 - Consultar Pré-estreias
export async function getPreEstreias(params?: {
  inicio?: string;
  fim?: string;
}): Promise<Sessao[]> {
  const query = params
    ? `?inicio=${params.inicio ?? ""}&fim=${params.fim ?? ""}`
    : "";
  return await get(`/sessoes/pre-estreias${query}`);
}

// RF02 - Vendas por Sessão
export async function getVendasPorSessao(): Promise<VendaSessao[]> {
  return await get("/sessoes/vendas");
}

// RF03 - Bilheteria e Arrecadação
export async function getBilheteria(): Promise<BilheteriaFilme[]> {
  return await get("/sessoes/bilheteria");
}

// RF04 - Taxa de Ocupação por Sessão
export async function getTaxaOcupacao(): Promise<OcupacaoSessao[]> {
  return await get("/sessoes/ocupacao");
}

// RF05 - Sessões de Maior Ocupação
export async function getSessoesMaisLotadas(): Promise<OcupacaoSessao[]> {
  return await get("/sessoes/mais-lotadas");
}
