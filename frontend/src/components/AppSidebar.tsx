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

import type { LucideIcon } from "lucide-react";
import { routeMeta } from "@/lib/routeMeta";

interface RouteMeta {
  title: string;
  icon: LucideIcon;
  group: string;
}

function buildLibraryItems(meta: Record<string, RouteMeta>) {
  const groups: Record<
    string,
    { title: string; icon: LucideIcon; items: { title: string; url: string }[] }
  > = {};

  for (const [url, info] of Object.entries(meta)) {
    if (!groups[info.group]) {
      groups[info.group] = {
        title: info.group,
        icon: info.icon,
        items: [],
      };
    }

    groups[info.group].items.push({
      title: info.title,
      url,
    });
  }

  return Object.values(groups);
}

const libraryItems = buildLibraryItems(routeMeta);

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="glass">
      <SidebarHeader>
        <SidebarGroupLabel className="font-bold text-lg">
          CineAnima
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
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
