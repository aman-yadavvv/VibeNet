"use client";

import { Search, X } from "lucide-react";

export function SearchBar({
  value, onChange, placeholder = "Search by name, category, city…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-surface-2/60 py-3.5 pl-11 pr-11 text-sm text-text-primary placeholder:text-text-muted backdrop-blur-xl transition focus:border-violet/60 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-violet/20"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-text-muted hover:bg-surface-3 hover:text-text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}