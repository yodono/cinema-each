// RF08 - FORMAS DE PAGAMENTO
export interface FormaPagamento {
  forma_pagamento: string;
  Ingressos_Comprados: number;
}

// RF26 - Vendas de Snacks
export interface VendaSnacks {
  snack: string;
  quantidade_vendida: number;
}

// RF27 - Receita de Colecionáveis
export interface ReceitaColecionaveis {
  filme: string;
  valor_de_receita: number;
}