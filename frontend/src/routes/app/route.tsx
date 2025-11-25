import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GradientBackground } from "@/components/animate-ui/components/backgrounds/gradient";
import { Calendar } from "lucide-react";
import { routeMeta } from "@/lib/routeMeta";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { location } = useRouterState();
  const currentPath = location.pathname;

  // fallback if route isn't registered
  const meta = routeMeta[currentPath] ?? {
    title: "Página",
    icon: Calendar,
  };

  const Icon = meta.icon;

  return (
    <div className="flex min-h-screen [view-transition-name:main-content]">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 p-4">
            <GradientBackground className="fixed -z-10 inset-0 flex items-center justify-center rounded-xl from-gray-900 via-gray-700/80 to-black" />

            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList className="flex items-center">
                    <BreadcrumbItem>
                      <Icon className="w-4 h-4" />
                    </BreadcrumbItem>

                    <BreadcrumbItem className="hidden md:block">
                      <span>{meta.group}</span>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{meta.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
