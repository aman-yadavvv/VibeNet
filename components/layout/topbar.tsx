"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";

export function Topbar() {
  const { myProfile } = useStore();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-base/80 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/dashboard"><Logo size={28} /></Link>
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-text-secondary transition hover:bg-surface-2 hover:text-text-primary">
            <Bell className="h-5 w-5" />
          </button>
          {myProfile && (
            <Link href="/profile/edit">
              <Avatar src={myProfile.avatar} name={myProfile.displayName} size="sm" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
