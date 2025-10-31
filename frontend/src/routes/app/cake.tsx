import Cake from "@/features/cake/components/Cake/Cake";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cake")({
  component: Cake,
});
