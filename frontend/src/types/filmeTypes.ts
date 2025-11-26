// RF09 - Filmes em Cartaz por Gênero
export interface FilmeCartazGenero {
  titulo: string;
  genero: string;
  sinopse: string;
  classificacao_etaria: string;
}

// RF21 - Filmes por Diretor
export interface Filme_Diretor {
  titulo: string;
  sinopse: string;
  classificacao_etaria: string;
}

//RF23 - Gênero Mais Comum por Diretor
export interface Genero_Diretor {
  diretor: string;
  genero: string;
}

// RF22 - Atores por Filme
export interface AtorFilme {
  ator: string;
}

// RF25 - Ranking de Atores Populares
export interface AtorPopular {
  ator: string;
  quantidade_ingressos: number;
}

export interface Diretor {
  nome: string;
  id_diretor: number;
}
