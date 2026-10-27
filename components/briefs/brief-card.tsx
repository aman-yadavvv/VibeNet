"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, Euro } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import type { Brief } from "@/lib/types";

const STATUS_LABEL: Record<Brief["status"], { text: string; className: string }> = {
  open: { text: "Open", className: "bg-mint/15 text-mint" },
  in_progress: { text: "In progress", className: "bg-violet/15 text-violet-glow" },
  closed: { text: "Closed", className: "bg-surface-3 text-text-muted" },
};

export function BriefCard({ brief, showOrganiser = true }: { brief: Brief; showOrganiser?: boolean }) {
  const { getProfileById, getProposalsForBrief } = useStore();
  const organiser = getProfileById(brief.organiserId);
  const proposalCount = getProposalsForBrief(brief.id).length;
  const status = STATUS_LABEL[brief.status];

  return (
    <Link href={`/briefs/${brief.id}`}>
      <Card className="group p-5 transition hover:border-white/20 hover:bg-surface-2/80">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${status.className}`}>
                {status.text}
              </span>
              <span className="rounded-full bg-surface-3 px-2 py-0.5 text-[10px] text-text-secondary">
                {brief.eventType}
              </span>
            </div>
            <p className="mt-2 truncate font-semibold">{brief.title}</p>
            <p className="mt-2 line-clamp-2 text-xs text-text-secondary">{brief.description}</p>
          </div>
          <span className="shrink-0 rounded-full bg-violet/15 px-2.5 py-0.5 text-[10px] font-medium text-violet-glow">
            {proposalCount} {proposalCount === 1 ? "proposal" : "proposals"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {brief.city}</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(brief.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {brief.guestCount}</span>
          <span className="inline-flex items-center gap-1">
            <Euro className="h-3 w-3" /> {brief.budgetMin.toLocaleString()}–{brief.budgetMax.toLocaleString()}
          </span>
        </div>

        {showOrganiser && organiser && (
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <Avatar src={organiser.avatar} name={organiser.displayName} size="sm" />
            <span className="text-xs text-text-secondary">{organiser.displayName}</span>
            <span className="ml-auto text-xs font-medium text-mint transition group-hover:translate-x-0.5">
              View brief →
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}