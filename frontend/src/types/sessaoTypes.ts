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
  titulo: string;
  arrecadacao_total: number;
  ingressos_vendidos: number;
}

export interface OcupacaoSessao {
  id_sessao: number;
  titulo: string;
  sala: number;
  capacidade: number;
  ingressos_vendidos: number;
  taxa_ocupacao_percentual: number;
}

export interface VendasDiaSemana {
  dia_semana: string;
  ingressos_vendidos: number;
  inteiras: number;
  meias: number;
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
  tipo_sala: string;
  arrecadacao_total: number;
  ingressos_vendidos: number;
}
