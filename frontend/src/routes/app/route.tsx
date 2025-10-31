import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen [view-transition-name:main-content]">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
