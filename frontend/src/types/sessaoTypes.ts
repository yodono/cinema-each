export interface Sessao {
  id_sessao: number;
  filme: string;
  sala: number;
  data: string;
  horario: string;
  tipo_exibicao: string;
  tipo_audio: string;
}

export interface VendaSessao {
  id_sessao: number;
  filme: string;
  inteiras_vendidas: number;
  meias_vendidas: number;
  total_vendidos: number;
}

export interface BilheteriaFilme {
  filmeId: number;
  filmeTitulo: string;
  totalIngressos: number;
  totalArrecadado: number;
}

export interface OcupacaoSessao {
  sessaoId: number;
  filmeTitulo: string;
  salaNumero: number;
  capacidade: number;
  ingressosVendidos: number;
  taxaOcupacao: number;
}
