import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "verified" | "mint" | "pink" | "violet" | "warn";

const variants: Record<Variant, string> = {
  default: "bg-surface-2 text-text-secondary border-border",
  verified: "bg-mint/15 text-mint border-mint/30",
  mint: "bg-mint/15 text-mint border-mint/30",
  pink: "bg-pink/15 text-pink border-pink/30",
  violet: "bg-violet/15 text-violet-glow border-violet/30",
  warn: "bg-coral/15 text-coral border-coral/30",
};

export function Badge({
  variant = "default", className, children, ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
      variants[variant], className
    )} {...props}>{children}</span>
  );
}