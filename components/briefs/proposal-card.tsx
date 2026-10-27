"use client";

import Link from "next/link";
import { Check, X, MessageSquare, Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import type { Proposal } from "@/lib/types";

const STATUS_LABEL: Record<Proposal["status"], { text: string; className: string }> = {
  submitted: { text: "Submitted", className: "bg-mint/15 text-mint" },
  accepted: { text: "Accepted", className: "bg-lime/15 text-lime" },
  declined: { text: "Declined", className: "bg-coral/15 text-coral" },
  withdrawn: { text: "Withdrawn", className: "bg-surface-3 text-text-muted" },
};

export function ProposalCard({
  proposal, canDecide = false, currentUserId,
}: {
  proposal: Proposal;
  canDecide?: boolean;
  currentUserId?: string;
}) {
  const { getProfileById, updateProposalStatus, threads } = useStore();
  const provider = getProfileById(proposal.providerId);
  const status = STATUS_LABEL[proposal.status];

  const thread = threads.find(
    (t) => t.proposalId === proposal.id ||
      (t.briefId === proposal.briefId &&
        (t.participantAId === currentUserId || t.participantBId === currentUserId) &&
        (t.participantAId === provider?.userId || t.participantBId === provider?.userId))
  );

  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Avatar src={provider?.avatar} name={provider?.displayName ?? "Provider"} size="lg" />
            <div className="min-w-0">
              <p className="font-semibold">{provider?.displayName ?? "Unknown provider"}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                {provider?.rating ? (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-lime text-lime" />
                    {provider.rating.toFixed(1)} ({provider.reviewCount ?? 0})
                  </span>
                ) : (
                  <span>New member</span>
                )}
                <span>·</span>
                <span>{provider?.city}</span>
              </div>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${status.className}`}>
            {status.text}
          </span>
        </div>

        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
          {proposal.message}
        </p>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-2/60 px-4 py-3">
          <span className="text-xs uppercase tracking-wider text-text-muted">Proposed price</span>
          <span className="font-display text-xl font-bold">€{proposal.price.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border bg-surface-2/40 p-3">
        {canDecide && proposal.status === "submitted" && (
          <>
            <Button size="sm" onClick={() => updateProposalStatus(proposal.id, "accepted")}>
              <Check className="h-3.5 w-3.5" /> Accept
            </Button>
            <Button size="sm" variant="ghost" onClick={() => updateProposalStatus(proposal.id, "declined")}>
              <X className="h-3.5 w-3.5" /> Decline
            </Button>
          </>
        )}
        {thread && (
          <Link href={`/messages/${thread.id}`} className="ml-auto">
            <Button size="sm" variant="ghost">
              <MessageSquare className="h-3.5 w-3.5" /> Message
            </Button>
          </Link>
        )}
        {!thread && !canDecide && (
          <span className="ml-auto text-xs text-text-muted">Your proposal is pending review.</span>
        )}
      </div>
    </Card>
  );
}