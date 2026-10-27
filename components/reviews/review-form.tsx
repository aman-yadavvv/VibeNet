"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { StarRating } from "./star-rating";
import { useStore } from "@/lib/store";
import type { Profile, Collaboration, Brief } from "@/lib/types";

export function ReviewForm({
  collaboration, target, brief, authorId,
}: {
  collaboration: Collaboration;
  target: Profile;
  brief: Brief | undefined;
  authorId: string;
}) {
  const { createReview } = useStore();
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    if (rating === 0) return setError("Pick a rating.");
    if (body.trim().length < 10) return setError("Write a few words (10+ characters).");
    createReview({
      collaborationId: collaboration.id,
      authorId,
      targetId: target.id,
      rating,
      body: body.trim(),
    });
    setDone(true);
  }

  if (done) {
    return (
      <Card className="border-mint/30 bg-mint/5 p-5 text-center">
        <p className="text-sm font-semibold text-mint">Review submitted 🎉</p>
        <p className="mt-1 text-xs text-text-secondary">
          Thank you — this helps the whole network.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <Avatar src={target.avatar} name={target.displayName} size="md" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{target.displayName}</p>
          <p className="truncate text-xs text-text-muted">
            {brief ? brief.title : "Collaboration"}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">
            How was it?
          </p>
          <StarRating value={rating} onChange={setRating} size="lg" />
        </div>
        <Textarea
          rows={4}
          placeholder="Share your experience — what worked, what didn't, would you recommend them?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {error && <p className="text-xs text-coral">{error}</p>}
        <Button type="submit" className="w-full">
          <Check className="h-4 w-4" /> Submit review
        </Button>
      </form>
    </Card>
  );
}