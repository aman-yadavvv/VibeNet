"use client";

import Link from "next/link";
import { MapPin, Star, CheckCircle2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { RoleBadge } from "./role-badge";
import { ROLE_META } from "@/lib/constants";
import type { Profile } from "@/lib/types";

export function ProfileCard({ profile }: { profile: Profile }) {
  const meta = ROLE_META[profile.role];
  return (
    <Link href={`/p/${profile.id}`}>
      <div className="group h-full overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-surface-2/80 hover:shadow-card">
        {/* Cover */}
        <div className="relative h-24 overflow-hidden">
          {profile.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.coverUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${meta.gradient} opacity-60`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />
          {profile.verified && (
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-medium text-mint backdrop-blur-md">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </div>
          )}
        </div>

        {/* Body */}
        <div className="-mt-8 px-4 pb-4">
          <Avatar src={profile.avatar} name={profile.displayName} size="lg" ring />
          <div className="mt-3 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-semibold">{profile.displayName}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-text-muted">
                <MapPin className="h-3 w-3" />
                <span>{profile.city}</span>
              </div>
            </div>
            <RoleBadge role={profile.role} />
          </div>

          {profile.tagline && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
              {profile.tagline}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {profile.categories.slice(0, 2).map((c) => (
              <span key={c} className="rounded-md bg-surface-3 px-2 py-0.5 text-[10px] text-text-secondary">
                {c}
              </span>
            ))}
            {profile.categories.length > 2 && (
              <span className="rounded-md bg-surface-3 px-2 py-0.5 text-[10px] text-text-muted">
                +{profile.categories.length - 2}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-lime text-lime" />
              <span className="font-semibold">{profile.rating?.toFixed(1) ?? "—"}</span>
              <span className="text-text-muted">({profile.reviewCount ?? 0})</span>
            </div>
            <span className="text-xs font-medium text-mint transition group-hover:translate-x-0.5">
              View profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}