"use client";

import Link from "next/link";
import {
  FileText, MessageSquare, Plus, ArrowRight, TrendingUp, Star,
  Calendar, MapPin, Sparkles,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { RoleBadge } from "@/components/profile/role-badge";
import { ROLE_META } from "@/lib/constants";

export default function DashboardPage() {
  const {
    me, myProfile, briefs, proposals, getProposalsForBrief, getThreadsForUser,
    getReviewsForProfile, getProfileById,
  } = useStore();

  if (!me || !myProfile) return null;

  const isProvider = ["venue", "vendor", "artist"].includes(myProfile.role);
  const myBriefs = briefs.filter((b) => b.organiserId === myProfile.id);
  const openBriefs = myBriefs.filter((b) => b.status !== "closed");
  const receivedProposals = proposals.filter((p) =>
    myBriefs.some((b) => b.id === p.briefId)
  );

  const sentProposals = proposals.filter((p) => p.providerId === myProfile.id);
  const matchedBriefs = briefs.filter(
    (b) => b.status === "open" && (!myProfile.city || b.city === myProfile.city)
  );

  const threads = getThreadsForUser(me.id);
  const reviews = getReviewsForProfile(myProfile.id);

  const stats = isProvider
    ? [
        { label: "Open briefs for you", value: matchedBriefs.length, icon: FileText, accent: "text-mint" },
        { label: "Proposals sent", value: sentProposals.length, icon: TrendingUp, accent: "text-violet-glow" },
        { label: "Active conversations", value: threads.length, icon: MessageSquare, accent: "text-pink" },
        { label: "Reviews", value: reviews.length, icon: Star, accent: "text-lime" },
      ]
    : [
        { label: "Active briefs", value: openBriefs.length, icon: FileText, accent: "text-mint" },
        { label: "Proposals received", value: receivedProposals.length, icon: TrendingUp, accent: "text-violet-glow" },
        { label: "Active conversations", value: threads.length, icon: MessageSquare, accent: "text-pink" },
        { label: "Reviews", value: reviews.length, icon: Star, accent: "text-lime" },
      ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-text-secondary">
            Welcome back, <span className="font-semibold text-text-primary">{myProfile.displayName.split(" ")[0]}</span> 👋
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {isProvider ? "Ready to land your next gig?" : "Let's plan something great."}
          </h1>
        </div>
        <Link href={isProvider ? "/discover?role=organiser" : "/briefs/new"}>
          <Button>
            <Plus className="h-4 w-4" />
            {isProvider ? "Find organisers" : "New brief"}
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{s.label}</p>
              <s.icon className={`h-4 w-4 ${s.accent}`} />
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">
              {isProvider ? "Briefs that match you" : "Your briefs"}
            </h2>
            <Link href="/briefs" className="text-xs text-mint hover:underline">
              View all →
            </Link>
          </div>

          {isProvider ? (
            <div className="space-y-3">
              {matchedBriefs.length === 0 ? (
                <EmptyCard
                  title="No briefs in your city yet"
                  subtitle="We'll notify you when a good fit lands."
                  cta={{ label: "Browse all briefs", href: "/briefs" }}
                />
              ) : (
                matchedBriefs.slice(0, 3).map((brief) => {
                  const organiser = getProfileById(brief.organiserId);
                  return (
                    <Link key={brief.id} href={`/briefs/${brief.id}`}>
                      <Card className="group p-5 transition hover:border-white/20 hover:bg-surface-2/80">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold">{brief.title}</p>
                            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {brief.city}
                              </span>
                              <span>·</span>
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(brief.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                              </span>
                              <span>·</span>
                              <span>€{brief.budgetMin.toLocaleString()}–€{brief.budgetMax.toLocaleString()}</span>
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-medium text-mint">
                            {brief.status === "open" ? "Open" : brief.status}
                          </span>
                        </div>
                        {organiser && (
                          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                            <Avatar src={organiser.avatar} name={organiser.displayName} size="sm" />
                            <span className="text-xs text-text-secondary">{organiser.displayName}</span>
                          </div>
                        )}
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {myBriefs.length === 0 ? (
                <EmptyCard
                  title="No briefs yet"
                  subtitle="Post your first brief to start receiving proposals."
                  cta={{ label: "Create brief", href: "/briefs/new" }}
                />
              ) : (
                myBriefs.slice(0, 3).map((brief) => {
                  const proposalCount = getProposalsForBrief(brief.id).length;
                  return (
                    <Link key={brief.id} href={`/briefs/${brief.id}`}>
                      <Card className="group p-5 transition hover:border-white/20 hover:bg-surface-2/80">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold">{brief.title}</p>
                            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {brief.city}
                              </span>
                              <span>·</span>
                              <span>{brief.guestCount} guests</span>
                            </p>
                          </div>
                          <span className="shrink-0 rounded-full bg-violet/15 px-2 py-0.5 text-[10px] font-medium text-violet-glow">
                            {proposalCount} {proposalCount === 1 ? "proposal" : "proposals"}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Right column: activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Recent chats</h2>
            <Link href="/messages" className="text-xs text-mint hover:underline">View all →</Link>
          </div>

          <Card className="p-2">
            {threads.length === 0 ? (
              <p className="p-4 text-center text-xs text-text-muted">No conversations yet.</p>
            ) : (
              threads.slice(0, 4).map((thread) => {
                const isA = thread.participantAId === me.id;
                const name = isA ? thread.participantBName : thread.participantAName;
                const avatar = isA ? thread.participantBAvatar : thread.participantAAvatar;
                return (
                  <Link
                    key={thread.id}
                    href={`/messages/${thread.id}`}
                    className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-surface-2"
                  >
                    <Avatar src={avatar} name={name} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{name}</p>
                      <p className="truncate text-xs text-text-muted">{thread.lastMessage}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </Card>

          <Card className="overflow-hidden">
            <div className={`bg-gradient-to-br ${ROLE_META[myProfile.role].gradient} p-5 text-base`}>
              <Sparkles className="h-5 w-5" />
              <p className="mt-2 text-sm font-semibold">
                {isProvider ? "Fill out your profile" : "Add a brief"}
              </p>
              <p className="mt-1 text-xs opacity-80">
                {isProvider
                  ? "Complete profiles get 3× more enquiries."
                  : "A detailed brief gets better proposals, faster."}
              </p>
              <Link
                href={isProvider ? "/profile/edit" : "/briefs/new"}
                className="mt-3 inline-flex items-center gap-1 rounded-full bg-base/30 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-base/50"
              >
                {isProvider ? "Update profile" : "Create brief"} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function EmptyCard({
  title, subtitle, cta,
}: { title: string; subtitle: string; cta: { label: string; href: string } }) {
  return (
    <Card className="border-dashed p-8 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
      <Link href={cta.href} className="mt-4 inline-block">
        <Button variant="ghost" size="sm">{cta.label} →</Button>
      </Link>
    </Card>
  );
}