import { Users, Building2, Music, Store } from "lucide-react";
import { ROLE_META } from "@/lib/constants";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS = { organiser: Users, venue: Building2, artist: Music, vendor: Store };

export function RoleBadge({
  role, size = "sm", className,
}: {
  role: Role;
  size?: "sm" | "md";
  className?: string;
}) {
  const Icon = ICONS[role];
  const meta = ROLE_META[role];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface-2/80 font-medium text-text-secondary",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <Icon className={cn(size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3")} />
      {meta.label}
    </span>
  );
}