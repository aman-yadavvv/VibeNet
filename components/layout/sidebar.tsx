"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Compass, FileText, MessageSquare, Star, User, LogOut,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import { ROLE_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/briefs", label: "Briefs", icon: FileText },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/profile/edit", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { me, myProfile, logout } = useStore();
  if (!me || !myProfile) return null;

  const roleMeta = ROLE_META[myProfile.role];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface/40 backdrop-blur-xl lg:flex">
      <div className="p-6">
        <Link href="/dashboard"><Logo /></Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-primary text-base shadow-glow"
                  : "text-text-secondary hover:bg-surface-2/70 hover:text-text-primary"
              )}
            >
              <item.icon className={cn("h-4 w-4", active ? "text-base" : "text-text-muted group-hover:text-text-primary")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-surface-2/50 p-3">
          <Avatar src={myProfile.avatar} name={myProfile.displayName} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{myProfile.displayName}</p>
            <p className="truncate text-xs text-text-muted">{roleMeta.label} · {myProfile.city}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg p-2 text-text-muted transition hover:bg-surface-3 hover:text-coral"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
