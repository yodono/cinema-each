import { get } from "../../../api/api";
import {
  type ClienteRanking,
  type ClienteResgateRanking,
  type IdadeMedia,
  type PublicoEstudantil,
  type ClienteSimples,
  type GeneroMensal,
} from "../../../types/clientesTypes";


//RF06 - Ranking de Clientes por Compra
export async function getRankingClientesPorCompra(params?: {
  inicio?: string;
  fim?: string;
}): Promise<ClienteRanking[]> {
  const query = params
    ? `?inicio=${params.inicio ?? ""}&fim=${params.fim ?? ""}`
    : "";
  return await get(`/api/publico/clientes/ranking/compras${query}`);
}

//RF29 - Ranking por resgates de benefícios
export async function getRankingClientesPorResgate(): Promise<ClienteResgateRanking[]> {
  return await get(`/api/publico/clientes/ranking/resgates`);
}

//RF17 - Idade média dos clientes por filme
export async function getIdadeMediaPorFilme(): Promise<IdadeMedia[]> {
  return await get(`/api/publico/idade-media/filmes`);
}

//RF07 - Idade média dos clientes por gênero de filme
export async function getIdadeMediaPorGenero(): Promise<IdadeMedia[]> {
  return await get(`/api/publico/idade-media/generos`);
}

//RF11 - público estudantil
export async function getPublicoEstudantil(params?: {
  inicio?: string;
  fim?: string;
}): Promise<PublicoEstudantil[]> {
  const query = params
    ? `?inicio=${params.inicio ?? ""}&fim=${params.fim ?? ""}`
    : "";
  return await get(`/api/publico/estudantil/ranking${query}`);
}

//RF14 - Clientes sem meia-entrada
export async function getClientesSemMeia(): Promise<ClienteSimples[]> {
  return await get(`/api/publico/clientes/sem-meia`);
}

//RF10 - Clientes por filme
export async function getClientesPorFilme(idFilme: number): Promise<ClienteSimples[]> {
  return await get(`/api/publico/clientes/por-filme?idFilme=${idFilme}`);
}

//RF19 - Gêneros de filme mais assistidos mensalmente
export async function getGenerosMaisAssistidos(params?: {
  inicio?: string;
  fim?: string;
}): Promise<GeneroMensal[]> {
  const query = params
    ? `?inicio=${params.inicio ?? ""}&fim=${params.fim ?? ""}`
    : "";
  return await get(`/api/publico/generos/mensal${query}`);
}