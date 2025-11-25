import {
  Calendar,
  Film,
  Users,
  DollarSign,
  BarChart3,
  Gift,
  type LucideIcon,
} from "lucide-react";

export const routeMeta: Record<
  string,
  {
    title: string;
    icon: LucideIcon;
    group: string;
  }
> = {
  // ---------------------------
  // Sessões
  // ---------------------------
  "/app/sessoes/pre-estreias": {
    title: "Pré-estreias",
    icon: Calendar,
    group: "Sessões",
  },
  "/app/sessoes/ocupacao": {
    title: "Taxa de Ocupação",
    icon: Calendar,
    group: "Sessões",
  },
  "/app/sessoes/populares": {
    title: "Sessões Populares",
    icon: Calendar,
    group: "Sessões",
  },
  "/app/sessoes/horarios": {
    title: "Horários Populares",
    icon: Calendar,
    group: "Sessões",
  },

  // ---------------------------
  // Filmes
  // ---------------------------
  "/app/filmes/bilheteria": {
    title: "Bilheteria e Arrecadação",
    icon: Film,
    group: "Filmes",
  },
  "/app/filmes/em-cartaz": {
    title: "Em Cartaz",
    icon: Film,
    group: "Filmes",
  },
  "/app/filmes/por-diretor": {
    title: "Por Diretor",
    icon: Film,
    group: "Filmes",
  },
  "/app/filmes/por-genero": {
    title: "Por Gênero",
    icon: Film,
    group: "Filmes",
  },
  "/app/filmes/atores": {
    title: "Atores e Popularidade",
    icon: Film,
    group: "Filmes",
  },

  // ---------------------------
  // Clientes
  // ---------------------------
  "/app/clientes/ranking": {
    title: "Ranking de Compras",
    icon: Users,
    group: "Clientes",
  },
  "/app/clientes/pontos": {
    title: "Ranking por Pontos",
    icon: Users,
    group: "Clientes",
  },
  "/app/clientes/por-filme": {
    title: "Clientes por Filme",
    icon: Users,
    group: "Clientes",
  },
  "/app/clientes/sem-meia": {
    title: "Sem Meia-entrada",
    icon: Users,
    group: "Clientes",
  },
  "/app/clientes/idade": {
    title: "Perfil e Idade Média",
    icon: Users,
    group: "Clientes",
  },

  // ---------------------------
  // Vendas e Produtos
  // ---------------------------
  "/app/vendas/por-sessao": {
    title: "Vendas por Sessão",
    icon: DollarSign,
    group: "Vendas e Produtos",
  },
  "/app/vendas/por-dia": {
    title: "Por Dia da Semana",
    icon: DollarSign,
    group: "Vendas e Produtos",
  },
  "/app/vendas/snacks": {
    title: "Snacks",
    icon: DollarSign,
    group: "Vendas e Produtos",
  },
  "/app/vendas/colecionaveis": {
    title: "Colecionáveis",
    icon: DollarSign,
    group: "Vendas e Produtos",
  },
  "/app/vendas/pagamento": {
    title: "Formas de Pagamento",
    icon: DollarSign,
    group: "Vendas e Produtos",
  },

  // ---------------------------
  // Estatísticas e Rankings
  // ---------------------------
  "/app/estatisticas/bilheteria": {
    title: "Comparativos de Bilheteria",
    icon: BarChart3,
    group: "Estatísticas e Rankings",
  },
  "/app/estatisticas/generos": {
    title: "Gêneros Mais Assistidos",
    icon: BarChart3,
    group: "Estatísticas e Rankings",
  },
  "/app/estatisticas/sessoes": {
    title: "Filmes com Mais Sessões",
    icon: BarChart3,
    group: "Estatísticas e Rankings",
  },
  "/app/estatisticas/duracao": {
    title: "Duração Média por Gênero",
    icon: BarChart3,
    group: "Estatísticas e Rankings",
  },

  // ---------------------------
  // Programa de Pontos
  // ---------------------------
  "/app/pontos/produtos": {
    title: "Produtos Resgatados",
    icon: Gift,
    group: "Programa de Pontos",
  },
  "/app/pontos/ranking": {
    title: "Ranking de Resgates",
    icon: Gift,
    group: "Programa de Pontos",
  },
} as const;
