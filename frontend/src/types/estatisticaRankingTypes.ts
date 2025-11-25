// RF12 - Comparativo de Bilheteria por Gênero
export interface BilheteriaGenero {
  genero: string;
  valor_Total: number;
}

// RF15 - Duração Média por Gênero
export interface DuracaoGenero {
  genero: string;
  duracao_media: number;
}

// RF24 - Bilheteria por Diretor
export interface BilheteriaDiretor {
  diretor: string;
  valor_de_bilheteria: number;
}