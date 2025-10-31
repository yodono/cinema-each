import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GradientBackground } from "@/components/animate-ui/components/backgrounds/gradient";

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
            <GradientBackground className="absolute -z-10 inset-0 flex items-center justify-center rounded-xl from-gray-900 via-gray-700/80 to-black" />

            <SidebarTrigger />
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
