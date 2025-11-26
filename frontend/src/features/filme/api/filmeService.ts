import { get } from "../../../api/api";
import {
  type FilmeCartazGenero,
  type Filme_Diretor,
  type Genero_Diretor,
  type AtorFilme,
  type AtorPopular,
} from "../../../types/filmeTypes";

// RF09 - Filmes em Cartaz por Gênero
export async function getFilmesEmCartaz(params?: {
  genero_filme?: string;
  dt_hoje?: string;
}): Promise<FilmeCartazGenero[]> {
  const query = params
    ? "?" +
      [
        params.genero_filme !== undefined
          ? `genero_filme=${params.genero_filme}`
          : null,
        params.dt_hoje ? `dt_hoje=${params.dt_hoje}` : null,
      ]
        .filter(Boolean)
        .join("&")
    : "";
  return await get(`/filmes/filmes-cartaz${query}`);
}

// RF21 - Filmes por Diretor
export async function getFilmePorDiretor(params?: {
  diretor?: string;
}): Promise<Filme_Diretor[]> {
  const query = params ? `?diretor=${params.diretor ?? ""}` : "";
  return await get(`/filmes/filme-diretor${query}`);
}

// RF23 - Gênero Mais Comum por Diretor
export async function getDiretorGenero(params?: {
  diretor?: string;
}): Promise<Genero_Diretor[]> {
  const query = params ? `?diretor=${params.diretor ?? ""}` : "";
  return await get(`/filmes/diretor-genero${query}`);
}

// RF22 - Atores por Filme
export async function getAtorPorFilme(params?: {
  filme?: string;
}): Promise<AtorFilme[]> {
  const query = params ? `?filme=${params.filme ?? ""}` : "";
  return await get(`/filmes/ator-filme${query}`);
}

// RF25 - Ranking de Atores Populares
export async function getAtoresPopulares(): Promise<AtorPopular[]> {
  return await get("/filmes/atores-populares");
}
