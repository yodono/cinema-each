// RF06 - Ranking de Clientes por Compra
export interface ClienteRanking {
  id_cliente: number;
  nome: string;
  cpf: string;
  total_produtos_comprados: number;
}

// RF29 - Ranking de Clientes por Resgate de Pontos
export interface ClienteResgateRanking {
  id_cliente: number;
  nome: string;
  cpf: string;
  total_pontos_resgatados: number;
}

// RF17 / RF07 - Idade média (por filme ou por gênero)
export interface IdadeMedia {
  nome: string; 
  idade_media: number;
}

// RF11 - Público Estudantil
export interface PublicoEstudantil {
  titulo: string;
  total_meia_entrada: number;
  total_ingressos: number;
  percentual_meia_entrada: number;
}

// RF10 / RF14 - Clientes simples (sem meia / por filme)
export interface ClienteSimples {
  id_cliente: number;
  nome: string;
  cpf: string;
  email: string;
}

// RF19 - Gêneros Mais Assistidos por Mês
export interface GeneroMensal {
  ano: number;
  mes: number;
  nome_genero: string;
  total_ingressos: number;
}
