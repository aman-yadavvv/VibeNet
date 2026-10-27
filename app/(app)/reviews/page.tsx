"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ReviewForm } from "@/components/reviews/review-form";
import { StarRating } from "@/components/reviews/star-rating";
import { cn } from "@/lib/utils";

type Tab = "pending" | "received";

export default function ReviewsPage() {
  const { myProfile, getPendingReviews, getReviewsForProfile, getProfileById } = useStore();
  const [tab, setTab] = useState<Tab>("pending");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!myProfile) return null;

  const pending = getPendingReviews(myProfile.id);
  const received = getReviewsForProfile(myProfile.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Reviews</h1>
        <p className="mt-1 text-text-secondary">
          Build reputation by reviewing collaborators — and see what others say about you.
        </p>
      </div>

      <div className="flex gap-1.5">
        <button
          onClick={() => setTab("pending")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-medium transition",
            tab === "pending"
              ? "border-violet/60 bg-violet/15 text-violet-glow"
              : "border-border bg-surface-2/60 text-text-secondary hover:border-white/20 hover:text-text-primary"
          )}
        >
          To review <span className="ml-1 opacity-60">{pending.length}</span>
        </button>
        <button
          onClick={() => setTab("received")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-medium transition",
            tab === "received"
              ? "border-violet/60 bg-violet/15 text-violet-glow"
              : "border-border bg-surface-2/60 text-text-secondary hover:border-white/20 hover:text-text-primary"
          )}
        >
          Received <span className="ml-1 opacity-60">{received.length}</span>
        </button>
      </div>

      {tab === "pending" && (
        <div className="space-y-4">
          {pending.length === 0 ? (
            <Card className="border-dashed p-12 text-center">
              <Sparkles className="mx-auto h-6 w-6 text-text-muted" />
              <p className="mt-3 font-semibold">Nothing to review right now</p>
              <p className="mt-1 text-sm text-text-secondary">
                Once you complete a collaboration, you'll be able to leave a review here.
              </p>
            </Card>
          ) : (
            pending.map(({ collaboration, target, brief }) => (
              <div key={collaboration.id}>
                {expandedId === collaboration.id ? (
                  <ReviewForm
                    collaboration={collaboration}
                    target={target}
                    brief={brief}
                    authorId={myProfile.id}
                  />
                ) : (
                  <Card
                    className="cursor-pointer p-5 transition hover:border-white/20 hover:bg-surface-2/80"
                    onClick={() => setExpandedId(collaboration.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar src={target.avatar} name={target.displayName} size="lg" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{target.displayName}</p>
                        <p className="truncate text-xs text-text-muted">
                          {brief ? brief.title : "Collaboration"}
                        </p>
                      </div>
                      <span className="rounded-full bg-mint/15 px-2.5 py-0.5 text-[10px] font-medium text-mint">
                        Review →
                      </span>
                    </div>
                  </Card>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {tab === "received" && (
        <div className="space-y-3">
          {received.length === 0 ? (
            <Card className="border-dashed p-12 text-center">
              <p className="font-semibold">No reviews yet</p>
              <p className="mt-1 text-sm text-text-secondary">
                Complete a collaboration and ask the other party to leave a review.
              </p>
            </Card>
          ) : (
            received.map((r) => {
              const author = getProfileById(r.authorId);
              return (
                <Card key={r.id} className="p-5">
                  <div className="flex items-start gap-3">
                    <Avatar src={author?.avatar} name={author?.displayName ?? "Unknown"} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {author ? (
                          <Link href={`/p/${author.id}`} className="text-sm font-semibold hover:underline">
                            {author.displayName}
                          </Link>
                        ) : (
                          <p className="text-sm font-semibold">Unknown</p>
                        )}
                        <StarRating value={r.rating} readOnly size="sm" />
                        <span className="text-xs text-text-muted">
                          {new Date(r.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{r.body}</p>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}