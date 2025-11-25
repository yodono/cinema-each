import { get } from "../../../api/api";
import {
  type BilheteriaGenero,
  type DuracaoGenero,
  type BilheteriaDiretor,
} from "../../../types/estatisticaRankingTypes";

// RF15 - Duração Média por Gênero
export async function getDuracaoPorGenero(params?: {
  dt_hoje?: string;
}): Promise<DuracaoGenero[]> {
  const query = params
    ? `?dt_hoje=${params.dt_hoje ?? ""}`
    : "";
  return await get(`/estatistica-ranking/duracao-genero${query}`);
}

// RF12 - Comparativo de Bilheteria por Gênero
export async function getBilheteriaPorGenero(): Promise<BilheteriaGenero[]> {
  return await get("/estatistica-ranking/bilheteria-genero");
}

// RF24 - Bilheteria por Diretor
export async function getBilheteriaDiretor(params?: {
  diretor?: string;
}): Promise<BilheteriaDiretor[]> {
  const query = params
    ? `?diretor=${params.diretor ?? ""}`
    : "";
  return await get(`/estatistica-ranking/bilheteria-diretor${query}`);
}


