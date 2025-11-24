import { get } from "../../../api/api";
import {
  type Sessao,
  type VendaSessao,
  type BilheteriaFilme,
  type OcupacaoSessao,
  type VendasDiaSemana,
  type HorarioPopular,
  type FilmeMaisSessoes,
  type BilheteriaPorSala,
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

// RF13 - Vendas por Dia da Semana
export async function getVendasPorDiaSemana(): Promise<VendasDiaSemana[]> {
  return await get("/sessoes/vendas-dia-semana");
}

// RF16 - Horários Populares
export async function getHorariosPopulares(): Promise<HorarioPopular[]> {
  return await get("/sessoes/horarios-populares");
}

// RF18 - Filmes com Mais Sessões
export async function getFilmesMaisSessoes(): Promise<FilmeMaisSessoes[]> {
  return await get("/sessoes/filmes-mais-sessoes");
}

// RF20 - Comparativo de Bilheteria por Sala
export async function getBilheteriaPorSala(): Promise<BilheteriaPorSala[]> {
  return await get("/sessoes/bilheteria-salas");
}
