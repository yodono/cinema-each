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
import { Cake, Home, Ticket } from "lucide-react";

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
    title: "Clube CineAnima",
    url: "/app/clube",
    icon: Ticket,
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
      </SidebarContent>
    </Sidebar>
  );
}
