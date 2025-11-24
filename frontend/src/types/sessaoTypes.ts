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

export interface VendasDiaSemana {
  dia_semana: string;
  total_vendidos: number;
}

export interface HorarioPopular {
  horario: string;
  ingressos_vendidos: number;
}

export interface FilmeMaisSessoes {
  titulo: string;
  total_sessoes: number;
}

export interface BilheteriaPorSala {
  sala: number;
  arrecadacao_total: number;
  ingressos_vendidos: number;
}
