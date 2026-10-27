"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { ProfileCard } from "@/components/profile/profile-card";
import { SearchBar } from "@/components/discovery/search-bar";
import { FilterPanel } from "@/components/discovery/filter-panel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Role } from "@/lib/types";

export default function DiscoverPage() {
  const { profiles, myProfile } = useStore();

  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role | "all">("all");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const activeCount = (role !== "all" ? 1 : 0) + (city ? 1 : 0) + (category ? 1 : 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return profiles
      .filter((p) => p.id !== myProfile?.id) // don't show yourself
      .filter((p) => (role === "all" ? true : p.role === role))
      .filter((p) => (city ? p.city === city : true))
      .filter((p) => (category ? p.categories.includes(category) : true))
      .filter((p) => {
        if (!q) return true;
        return (
          p.displayName.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }, [profiles, myProfile, query, role, city, category]);

  function clearAll() {
    setRole("all"); setCity(""); setCategory("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Discover the network
        </h1>
        <p className="mt-1 text-text-secondary">
          {profiles.length - 1} profiles across venues, vendors, artists, and organisers.
        </p>
      </div>

      <SearchBar value={query} onChange={setQuery} />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <FilterPanel
          role={role}
          city={city}
          category={category}
          onRoleChange={setRole}
          onCityChange={setCity}
          onCategoryChange={setCategory}
          onClear={clearAll}
          activeCount={activeCount}
        />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-text-primary">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "profile" : "profiles"}
            </p>
          </div>

          {filtered.length === 0 ? (
            <Card className="border-dashed p-12 text-center">
              <p className="font-semibold">No matches</p>
              <p className="mt-1 text-sm text-text-secondary">Try clearing a filter or searching differently.</p>
              <Button variant="ghost" size="sm" className="mt-4" onClick={clearAll}>
                Clear all filters
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}