"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, SearchX } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefCard } from "@/components/briefs/brief-card";
import type { BriefStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "all" | BriefStatus;

export default function BriefsPage() {
  const { briefs, myProfile, proposals } = useStore();
  const [tab, setTab] = useState<Tab>("all");

  if (!myProfile) return null;
  const isProvider = ["venue", "vendor", "artist"].includes(myProfile.role);

  if (isProvider) {
    // Provider sees open briefs matched to their city + categories
    const matched = briefs
      .filter((b) => b.status === "open")
      .filter((b) => !myProfile.city || b.city === myProfile.city)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const alreadyProposedIds = new Set(
      proposals.filter((p) => p.providerId === myProfile.id).map((p) => p.briefId)
    );

    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Briefs</h1>
          <p className="mt-1 text-text-secondary">
            {matched.length} open brief{matched.length === 1 ? "" : "s"} in your city.
            {alreadyProposedIds.size > 0 && ` You've already proposed on ${alreadyProposedIds.size}.`}
          </p>
        </div>

        {matched.length === 0 ? (
          <Card className="border-dashed p-12 text-center">
            <SearchX className="mx-auto h-8 w-8 text-text-muted" />
            <p className="mt-3 font-semibold">No open briefs in {myProfile.city} right now</p>
            <p className="mt-1 text-sm text-text-secondary">
              We'll surface them here as soon as they land. Check back soon.
            </p>
          </Card>
        ) : (
          <div className="grid gap-3">
            {matched.map((b) => (
              <BriefCard key={b.id} brief={b} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Organiser sees their own briefs
  const mine = briefs.filter((b) => b.organiserId === myProfile.id);
  const filtered = tab === "all" ? mine : mine.filter((b) => b.status === tab);

  const counts = {
    all: mine.length,
    open: mine.filter((b) => b.status === "open").length,
    in_progress: mine.filter((b) => b.status === "in_progress").length,
    closed: mine.filter((b) => b.status === "closed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your briefs</h1>
          <p className="mt-1 text-text-secondary">Post a brief. Get proposals. Pick the right fit.</p>
        </div>
        <Link href="/briefs/new">
          <Button><Plus className="h-4 w-4" /> New brief</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {([
          { key: "all", label: "All", count: counts.all },
          { key: "open", label: "Open", count: counts.open },
          { key: "in_progress", label: "In progress", count: counts.in_progress },
          { key: "closed", label: "Closed", count: counts.closed },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as Tab)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition",
              tab === t.key
                ? "border-violet/60 bg-violet/15 text-violet-glow"
                : "border-border bg-surface-2/60 text-text-secondary hover:border-white/20 hover:text-text-primary"
            )}
          >
            {t.label} <span className="ml-1 opacity-60">{t.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed p-12 text-center">
          <p className="font-semibold">
            {tab === "all" ? "No briefs yet" : `No ${tab.replace("_", " ")} briefs`}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {tab === "all" ? "Post your first brief to start receiving proposals." : "Try a different tab."}
          </p>
          {tab === "all" && (
            <Link href="/briefs/new" className="mt-4 inline-block">
              <Button variant="ghost">Create your first brief →</Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((b) => <BriefCard key={b.id} brief={b} showOrganiser={false} />)}
        </div>
      )}
    </div>
  );
}