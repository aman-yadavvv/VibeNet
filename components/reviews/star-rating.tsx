"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value, onChange, size = "md", readOnly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}) {
  const sizes = { sm: "h-3 w-3", md: "h-5 w-5", lg: "h-7 w-7" };
  const [hover, setHover] = [
    // simple hover state via CSS class trick — no state needed
  ] as unknown as [number, (v: number) => void];

  return (
    <div className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(i)}
          className={cn(
            "transition",
            !readOnly && "hover:scale-110",
            readOnly && "cursor-default"
          )}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
        >
          <Star
            className={cn(
              sizes[size],
              i <= value ? "fill-lime text-lime" : "text-text-muted"
            )}
          />
        </button>
      ))}
    </div>
  );
}