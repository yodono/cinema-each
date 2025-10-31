import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import {
  Cake,
  Home,
  BarChart3,
  Film,
  Users,
  Calendar,
  DollarSign,
  Gift,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuHighlight,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuHighlightItem,
} from "./animate-ui/primitives/radix/dropdown-menu";

const discoveryItems = [
  {
    title: "Início",
    url: "/app/home",
    icon: Home,
  },
  {
    title: "Bolo",
    url: "/app/cake",
    icon: Cake,
  },
];

const libraryItems = [
  {
    title: "Sessões",
    icon: Calendar,
    items: [
      { title: "Pré-estreias", url: "/app/sessoes/pre-estreias" },
      { title: "Taxa de Ocupação", url: "/app/sessoes/ocupacao" },
      { title: "Sessões Populares", url: "/app/sessoes/populares" },
      { title: "Horários Populares", url: "/app/sessoes/horarios" },
    ],
  },
  {
    title: "Filmes",
    icon: Film,
    items: [
      { title: "Bilheteria e Arrecadação", url: "/app/filmes/bilheteria" },
      { title: "Em Cartaz", url: "/app/filmes/em-cartaz" },
      { title: "Por Diretor", url: "/app/filmes/por-diretor" },
      { title: "Por Gênero", url: "/app/filmes/por-genero" },
      { title: "Atores e Popularidade", url: "/app/filmes/atores" },
    ],
  },
  {
    title: "Clientes",
    icon: Users,
    items: [
      { title: "Ranking de Compras", url: "/app/clientes/ranking" },
      { title: "Ranking por Pontos", url: "/app/clientes/pontos" },
      { title: "Clientes por Filme", url: "/app/clientes/por-filme" },
      { title: "Sem Meia-entrada", url: "/app/clientes/sem-meia" },
      { title: "Perfil e Idade Média", url: "/app/clientes/idade" },
    ],
  },
  {
    title: "Vendas e Produtos",
    icon: DollarSign,
    items: [
      { title: "Vendas por Sessão", url: "/app/vendas/por-sessao" },
      { title: "Por Dia da Semana", url: "/app/vendas/por-dia" },
      { title: "Snacks", url: "/app/vendas/snacks" },
      { title: "Colecionáveis", url: "/app/vendas/colecionaveis" },
      { title: "Formas de Pagamento", url: "/app/vendas/pagamento" },
    ],
  },
  {
    title: "Estatísticas e Rankings",
    icon: BarChart3,
    items: [
      {
        title: "Comparativos de Bilheteria",
        url: "/app/estatisticas/bilheteria",
      },
      { title: "Gêneros Mais Assistidos", url: "/app/estatisticas/generos" },
      { title: "Filmes com Mais Sessões", url: "/app/estatisticas/sessoes" },
      { title: "Duração Média por Gênero", url: "/app/estatisticas/duracao" },
    ],
  },
  {
    title: "Programa de Pontos",
    icon: Gift,
    items: [
      { title: "Produtos Resgatados", url: "/app/pontos/produtos" },
      { title: "Ranking de Resgates", url: "/app/pontos/ranking" },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="glass">
      <SidebarHeader>
        <SidebarGroupLabel className="font-bold text-lg">
          CineAnima
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Descubra</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {discoveryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            Biblioteca
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {libraryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      side="right"
                      align="start"
                      className="w-56 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden p-2 z-50 glass"
                    >
                      <DropdownMenuHighlight
                        className="absolute inset-0 bg-accent z-0"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                          mass: 0.5,
                        }}
                      >
                        <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">
                          {item.title}
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-border" />

                        <DropdownMenuGroup>
                          {item.items.map((subItem, idx) => (
                            <DropdownMenuHighlightItem key={idx}>
                              <DropdownMenuItem className="relative z-[1] focus:text-accent-foreground select-none flex items-center gap-2 px-2 py-1.5 text-sm outline-none [&_svg]:size-4 [&_span]:data-[slot=dropdown-menu-shortcut]:text-xs [&_span]:data-[slot=dropdown-menu-shortcut]:ml-auto">
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuHighlightItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuHighlight>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
