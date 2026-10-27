"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Calendar, MapPin, Users, Euro, Sparkles, Check, Clock, CheckCircle2,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProposalForm } from "@/components/briefs/proposal-form";
import { ProposalCard } from "@/components/briefs/proposal-card";

export default function BriefDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const {
    myProfile, getBriefById, getProfileById, getProposalsForBrief,
    proposals, me, getCollaborationForBrief, confirmCollaboration,
  } = useStore();

  const brief = getBriefById(params.id);
  if (!brief) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl font-bold">Brief not found</p>
        <Link href="/briefs" className="mt-4 inline-block text-sm text-mint hover:underline">
          ← Back to briefs
        </Link>
      </div>
    );
  }

  const organiser = getProfileById(brief.organiserId);
  const allProposals = getProposalsForBrief(brief.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const collaboration = getCollaborationForBrief(brief.id);

  const isOwner = myProfile?.id === brief.organiserId;
  const isProvider = myProfile?.role === "venue" || myProfile?.role === "vendor" || myProfile?.role === "artist";
  const myProposal = proposals.find(
    (p) => p.briefId === brief.id && p.providerId === myProfile?.id
  );
  const canSubmitProposal = isProvider && !isOwner && !myProposal && brief.status === "open";

  const isCollaborator = collaboration &&
    (collaboration.organiserId === myProfile?.id || collaboration.providerId === myProfile?.id);
  const myConfirmed = collaboration && (
    (collaboration.organiserId === myProfile?.id && collaboration.organiserConfirmed) ||
    (collaboration.providerId === myProfile?.id && collaboration.providerConfirmed)
  );
  const fullyCompleted = collaboration?.completedAt != null;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                brief.status === "open" ? "bg-mint/15 text-mint"
                : brief.status === "in_progress" ? "bg-violet/15 text-violet-glow"
                : "bg-surface-3 text-text-muted"
              }`}>
                {brief.status === "open" ? "Open" : brief.status === "in_progress" ? "In progress" : "Closed"}
              </span>
              <span className="rounded-full bg-surface-3 px-2.5 py-0.5 text-[11px] text-text-secondary">
                {brief.eventType}
              </span>
            </div>

            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {brief.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-mint" /> {brief.city}</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4 text-pink" />
                {new Date(brief.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1"><Users className="h-4 w-4 text-violet-glow" /> {brief.guestCount} guests</span>
              <span className="inline-flex items-center gap-1">
                <Euro className="h-4 w-4 text-lime" /> {brief.budgetMin.toLocaleString()}–{brief.budgetMax.toLocaleString()}
              </span>
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Description</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
                {brief.description}
              </p>
            </div>
          </Card>

          {/* Collaboration completion */}
          {isCollaborator && collaboration && (
            <Card className={`p-6 ${fullyCompleted ? "border-mint/30 bg-mint/5" : "border-violet/30 bg-violet/5"}`}>
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  fullyCompleted ? "bg-mint/20 text-mint" : "bg-violet/20 text-violet-glow"
                }`}>
                  {fullyCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">
                    {fullyCompleted ? "Collaboration completed" : "Collaboration in progress"}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {fullyCompleted
                      ? "Both parties confirmed. You can now leave a review."
                      : myConfirmed
                        ? "You've confirmed. Waiting for the other party to confirm completion."
                        : "Mark this collaboration complete when the work is done."}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {!fullyCompleted && !myConfirmed && (
                      <Button
                        size="sm"
                        onClick={() => confirmCollaboration(collaboration.id, myProfile!.id)}
                      >
                        <Check className="h-3.5 w-3.5" /> Mark complete
                      </Button>
                    )}
                    {!fullyCompleted && myConfirmed && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-3 py-1 text-xs text-mint">
                        <Check className="h-3 w-3" /> You confirmed
                      </span>
                    )}
                    {fullyCompleted && (
                      <Link href="/reviews">
                        <Button size="sm" variant="ghost">
                          <Sparkles className="h-3.5 w-3.5" /> Leave a review
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Proposals (owner view) */}
          {isOwner && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">
                  Proposals ({allProposals.length})
                </h2>
              </div>
              {allProposals.length === 0 ? (
                <Card className="border-dashed p-8 text-center">
                  <Sparkles className="mx-auto h-6 w-6 text-text-muted" />
                  <p className="mt-2 text-sm font-semibold">No proposals yet</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Matched providers will be notified. Sit tight.
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {allProposals.map((p) => (
                    <ProposalCard
                      key={p.id}
                      proposal={p}
                      canDecide={isOwner && brief.status !== "closed"}
                      currentUserId={me?.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {canSubmitProposal && <ProposalForm briefId={brief.id} providerId={myProfile!.id} />}

          {myProposal && !isOwner && (
            <div>
              <h2 className="mb-3 font-display text-xl font-semibold">Your proposal</h2>
              <ProposalCard proposal={myProposal} canDecide={false} currentUserId={me?.id} />
            </div>
          )}

          {!isOwner && !isProvider && (
            <Card className="p-5 text-center">
              <p className="text-sm text-text-secondary">
                You're viewing this as an organiser. Only providers can submit proposals.
              </p>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          {organiser && (
            <Card className="p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Posted by</p>
              <Link href={`/p/${organiser.id}`} className="mt-3 flex items-center gap-3">
                <Avatar src={organiser.avatar} name={organiser.displayName} size="lg" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{organiser.displayName}</p>
                  <p className="truncate text-xs text-text-muted">{organiser.city}</p>
                </div>
              </Link>
              <Link
                href={`/p/${organiser.id}`}
                className="mt-3 block rounded-full bg-surface-2 py-2 text-center text-xs font-medium text-text-primary transition hover:bg-surface-3"
              >
                View profile
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}