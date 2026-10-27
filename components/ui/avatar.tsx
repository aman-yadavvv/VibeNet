import * as React from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";
const sizes: Record<Size, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-24 w-24 text-xl",
};

export function Avatar({ src, name, size = "md", className, ring }: {
  src?: string; name: string; size?: Size; className?: string; ring?: boolean;
}) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={cn(
      "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-primary font-semibold text-base",
      sizes[size],
      ring && "ring-2 ring-violet/40 ring-offset-2 ring-offset-base",
      className
    )}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : <span>{initials}</span>}
    </div>
  );
}