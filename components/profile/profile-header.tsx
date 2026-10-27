"use client";

import { MapPin, Star, CheckCircle2, Mail, ExternalLink } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { RoleBadge } from "./role-badge";
import { ROLE_META } from "@/lib/constants";
import type { Profile } from "@/lib/types";

export function ProfileHeader({ profile }: { profile: Profile }) {
  const meta = ROLE_META[profile.role];
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface/60 backdrop-blur-xl">
      <div className="relative h-48 sm:h-56">
        {profile.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.coverUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${meta.gradient} opacity-70`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
      </div>

      <div className="relative -mt-16 px-6 pb-6 sm:-mt-20 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Avatar src={profile.avatar} name={profile.displayName} size="xl" ring />
          <div className="flex-1 sm:pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {profile.displayName}
              </h1>
              {profile.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2.5 py-0.5 text-[11px] font-medium text-mint">
                  <CheckCircle2 className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
              <RoleBadge role={profile.role} size="md" />
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {profile.city}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-lime text-lime" />
                <span className="font-semibold text-text-primary">{profile.rating?.toFixed(1) ?? "—"}</span>
                <span className="text-text-muted">({profile.reviewCount ?? 0} reviews)</span>
              </div>
            </div>
            {profile.tagline && (
              <p className="mt-3 text-base text-text-secondary">{profile.tagline}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}