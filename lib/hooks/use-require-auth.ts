"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export function useRequireAuth() {
  const { me, hydrated } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !me) router.replace("/login");
  }, [hydrated, me, router]);

  return { me, hydrated };
}
