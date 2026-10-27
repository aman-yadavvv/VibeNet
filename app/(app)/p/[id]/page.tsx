"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, CheckCircle2, Mail, MapPin, Star, MessageSquare,
  Sparkles, Briefcase, Calendar, Tag,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ReviewList } from "@/components/profile/review-list";

export default function PublicProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getProfileById, getReviewsForProfile } = useStore();
  const profile = getProfileById(params.id);
  const [msgNote, setMsgNote] = useState(false);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-2xl font-bold">Profile not found</p>
        <p className="mt-2 text-text-secondary">This person may have been removed or the link is wrong.</p>
        <Link href="/discover" className="mt-6">
          <Button variant="ghost">← Back to discover</Button>
        </Link>
      </div>
    );
  }

  const reviews = getReviewsForProfile(profile.id);

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-text-secondary transition hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <ProfileHeader profile={profile} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold">About</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
              {profile.bio || "This member hasn't added a bio yet."}
            </p>
          </Card>

          {profile.categories.length > 0 && (
            <Card className="p-6">
              <h2 className="font-display text-lg font-semibold">Focus areas</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.categories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-text-secondary"
                  >
                    <Tag className="h-3 w-3" /> {c}
                  </span>
                ))}
              </div>
            </Card>
          )}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                Reviews ({reviews.length})
              </h2>
            </div>
            <ReviewList profileId={profile.id} />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Quick facts</p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-text-secondary">
                <MapPin className="mt-0.5 h-4 w-4 text-mint" />
                <span>Based in <strong className="text-text-primary">{profile.city}</strong></span>
              </li>
              {profile.budgetMin && profile.budgetMax && (
                <li className="flex items-start gap-2 text-text-secondary">
                  <Briefcase className="mt-0.5 h-4 w-4 text-violet-glow" />
                  <span>
                    Typical range{" "}
                    <strong className="text-text-primary">
                      €{profile.budgetMin.toLocaleString()}–€{profile.budgetMax.toLocaleString()}
                    </strong>
                  </span>
                </li>
              )}
              <li className="flex items-start gap-2 text-text-secondary">
                <Calendar className="mt-0.5 h-4 w-4 text-pink" />
                <span>Member since {new Date(profile.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
              </li>
              <li className="flex items-start gap-2 text-text-secondary">
                <Star className="mt-0.5 h-4 w-4 text-lime" />
                <span>
                  <strong className="text-text-primary">{profile.rating?.toFixed(1) ?? "—"}</strong>{" "}
                  from {profile.reviewCount ?? 0} reviews
                </span>
              </li>
            </ul>
          </Card>

          <Card className="space-y-2 p-5">
            <Button
              className="w-full"
              onClick={() => setMsgNote(true)}
            >
              <MessageSquare className="h-4 w-4" /> Message
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setMsgNote(true)}>
              <Mail className="h-4 w-4" /> Send brief
            </Button>
            {msgNote && (
              <p className="rounded-lg bg-mint/10 px-3 py-2 text-center text-xs text-mint">
                <Sparkles className="mr-1 inline h-3 w-3" />
                Messaging opens in the next update — hang tight!
              </p>
            )}
          </Card>

          {profile.verified && (
            <Card className="p-5">
              <div className="flex items-center gap-2 text-mint">
                <CheckCircle2 className="h-5 w-5" />
                <p className="text-sm font-semibold">Verified profile</p>
              </div>
              <p className="mt-2 text-xs text-text-secondary">
                Business details, insurance, and references have been checked by our team.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
