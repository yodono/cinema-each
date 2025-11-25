import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type DarkGlassProps = {
  children: ReactNode;
  className?: string;
};

export function DarkGlass({ children, className }: DarkGlassProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-xl border rounded-2xl shadow-xl p-6",
        className
      )}
      style={{
        background: "rgba(20, 20, 30, 0.55)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
    >
      {children}
    </div>
  );
}
