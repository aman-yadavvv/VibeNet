"use client";

import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";

export function ReviewList({ profileId }: { profileId: string }) {
  const { getReviewsForProfile, getProfileById } = useStore();
  const reviews = getReviewsForProfile(profileId);

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/30 p-8 text-center">
        <p className="text-sm text-text-muted">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => {
        const author = getProfileById(review.authorId);
        return (
          <div key={review.id} className="rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <Avatar src={author?.avatar} name={author?.displayName ?? "Anonymous"} size="md" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{author?.displayName ?? "Anonymous"}</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i <= review.rating ? "fill-lime text-lime" : "text-text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{review.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}