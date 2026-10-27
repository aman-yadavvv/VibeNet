"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Plus, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { RoleBadge } from "@/components/profile/role-badge";
import { CITIES, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ProfileEditPage() {
  const { myProfile, updateProfile } = useStore();

  const [displayName, setDisplayName] = useState(myProfile?.displayName ?? "");
  const [tagline, setTagline] = useState(myProfile?.tagline ?? "");
  const [bio, setBio] = useState(myProfile?.bio ?? "");
  const [city, setCity] = useState(myProfile?.city ?? CITIES[0]);
  const [categories, setCategories] = useState<string[]>(myProfile?.categories ?? []);
  const [budgetMin, setBudgetMin] = useState(myProfile?.budgetMin?.toString() ?? "");
  const [budgetMax, setBudgetMax] = useState(myProfile?.budgetMax?.toString() ?? "");
  const [avatar, setAvatar] = useState(myProfile?.avatar ?? "");
  const [saved, setSaved] = useState(false);

  if (!myProfile) return null;

  function toggleCategory(c: string) {
    setCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({
      id: myProfile!.id,
      displayName: displayName.trim() || myProfile!.displayName,
      tagline: tagline.trim(),
      bio: bio.trim(),
      city,
      categories,
      budgetMin: budgetMin ? Number(budgetMin) : undefined,
      budgetMax: budgetMax ? Number(budgetMax) : undefined,
      avatar: avatar || myProfile!.avatar,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your profile</h1>
        <p className="mt-1 text-text-secondary">Complete profiles get 3× more enquiries.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={save} className="space-y-5 lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Avatar src={avatar || myProfile.avatar} name={displayName || myProfile.displayName} size="xl" ring />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{displayName || myProfile.displayName}</p>
                <div className="mt-1 flex items-center gap-2">
                  <RoleBadge role={myProfile.role} size="md" />
                  {myProfile.verified && (
                    <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-medium text-mint">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <Input label="Display name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              <Input label="Avatar image URL" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://…" />
              <Input
                label="Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One line about what you do"
                hint="Keep it short and specific. Shown on your card."
              />
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">About</p>
            <div className="mt-3">
              <Textarea
                rows={6}
                placeholder="Tell the network who you are, what you do, and what makes you different."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Select label="City" value={city} onChange={(e) => setCity(e.target.value)}>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
              <div /> {/* spacer */}
              <Input
                label="Budget min (€)"
                type="number"
                placeholder="5000"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
              />
              <Input
                label="Budget max (€)"
                type="number"
                placeholder="40000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
              />
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Categories (pick all that apply)
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => {
                const active = categories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCategory(c)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition",
                      active
                        ? "border-violet/60 bg-violet/15 text-violet-glow"
                        : "border-border bg-surface-2/60 text-text-secondary hover:border-white/20 hover:text-text-primary"
                    )}
                  >
                    {active ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    {c}
                  </button>
                );
              })}
            </div>
          </Card>

          <div className="flex items-center justify-end gap-3">
            {saved && (
              <span className="inline-flex items-center gap-1 text-sm text-mint">
                <Check className="h-4 w-4" /> Saved
              </span>
            )}
            <Link href="/dashboard">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
            <Button type="submit">Save changes</Button>
          </div>
        </form>

        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Profile tips</p>
            <ul className="mt-3 space-y-2 text-xs text-text-secondary">
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-mint" /> Add a real photo — it triples enquiries.</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-mint" /> Be specific in your tagline.</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-mint" /> Fill in your bio — at least 2–3 sentences.</li>
              <li className="flex gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0 text-mint" /> Pick categories so you appear in the right searches.</li>
            </ul>
          </Card>

          {!myProfile.verified && (
            <Card className="border-dashed p-5">
              <p className="text-sm font-semibold">Get verified</p>
              <p className="mt-1 text-xs text-text-secondary">
                Verified profiles get a trust badge and rank higher in discovery.
              </p>
              <Link href="/discover" className="mt-3 inline-block text-xs text-mint hover:underline">
                Learn how →
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}