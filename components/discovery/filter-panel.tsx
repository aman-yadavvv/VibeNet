"use client";

import { ROLES, ROLE_META, CITIES, CATEGORIES } from "@/lib/constants";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type Props = {
  role: Role | "all";
  city: string;
  category: string;
  onRoleChange: (r: Role | "all") => void;
  onCityChange: (c: string) => void;
  onCategoryChange: (c: string) => void;
  onClear: () => void;
  activeCount: number;
};

export function FilterPanel(props: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-xl lg:sticky lg:top-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        {props.activeCount > 0 && (
          <button
            onClick={props.onClear}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-coral"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">Role</p>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={props.role === "all"} onClick={() => props.onRoleChange("all")}>
            All
          </Chip>
          {ROLES.map((r) => (
            <Chip key={r} active={props.role === r} onClick={() => props.onRoleChange(r)}>
              {ROLE_META[r].label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">City</p>
        <select
          value={props.city}
          onChange={(e) => props.onCityChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-2/60 px-3 py-2.5 text-sm text-text-primary focus:border-violet/60 focus:outline-none focus:ring-2 focus:ring-violet/20"
        >
          <option value="">All cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">Category</p>
        <select
          value={props.category}
          onChange={(e) => props.onCategoryChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-2/60 px-3 py-2.5 text-sm text-text-primary focus:border-violet/60 focus:outline-none focus:ring-2 focus:ring-violet/20"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
}

function Chip({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-violet/60 bg-violet/15 text-violet-glow"
          : "border-border bg-surface-2/60 text-text-secondary hover:border-white/20 hover:text-text-primary"
      )}
    >
      {children}
    </button>
  );
}