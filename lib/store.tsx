"use client";

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from "react";
import type {
  User, Profile, Brief, Proposal, Thread, Message, Review, Collaboration, Role,
} from "./types";
import {
  seedUsers, seedProfiles, seedBriefs, seedProposals,
  seedThreads, seedMessages, seedReviews, seedCollaborations,
} from "./mock-data";

const STORAGE_KEY = "vibenet:v1";

type State = {
  users: User[];
  profiles: Profile[];
  briefs: Brief[];
  proposals: Proposal[];
  threads: Thread[];
  messages: Message[];
  collaborations: Collaboration[];
  reviews: Review[];
  currentUserId: string | null;
};

const emptyState: State = {
  users: [], profiles: [], briefs: [], proposals: [], threads: [],
  messages: [], collaborations: [], reviews: [], currentUserId: null,
};

const seededState: State = {
  users: seedUsers, profiles: seedProfiles, briefs: seedBriefs, proposals: seedProposals,
  threads: seedThreads, messages: seedMessages, collaborations: seedCollaborations,
  reviews: seedReviews, currentUserId: null,
};

type CreateBriefInput = Omit<Brief, "id" | "createdAt" | "status">;
type CreateProposalInput = { briefId: string; providerId: string; message: string; price: number };
type UpdateProfileInput = {
  id: string;
  displayName?: string;
  tagline?: string;
  bio?: string;
  city?: string;
  categories?: string[];
  budgetMin?: number;
  budgetMax?: number;
  avatar?: string;
};
type CreateReviewInput = {
  collaborationId: string;
  authorId: string;
  targetId: string;
  rating: number;
  body: string;
};

type StoreContextValue = State & {
  hydrated: boolean;
  me: User | null;
  myProfile: Profile | null;
  signup: (input: { name: string; email: string; password: string; role: Role; city: string }) => { ok: boolean; error?: string };
  login: (input: { email: string; password: string }) => { ok: boolean; error?: string };
  demoLogin: () => void;
  logout: () => void;
  getProfileById: (id: string) => Profile | undefined;
  getProfileByUserId: (userId: string) => Profile | undefined;
  getBriefById: (id: string) => Brief | undefined;
  getProposalsForBrief: (briefId: string) => Proposal[];
  getMessagesForThread: (threadId: string) => Message[];
  getReviewsForProfile: (profileId: string) => Review[];
  getThreadsForUser: (userId: string) => Thread[];
  getThreadById: (id: string) => Thread | undefined;
  getCollaborationForBrief: (briefId: string) => Collaboration | undefined;
  getPendingReviews: (profileId: string) => Array<{ collaboration: Collaboration; target: Profile; brief: Brief | undefined }>;
  createBrief: (input: CreateBriefInput) => Brief | undefined;
  createProposal: (input: CreateProposalInput) => Proposal | undefined;
  updateProposalStatus: (proposalId: string, status: Proposal["status"]) => void;
  updateProfile: (input: UpdateProfileInput) => void;
  sendMessage: (threadId: string, body: string, senderId: string) => void;
  confirmCollaboration: (collaborationId: string, profileId: string) => void;
  createReview: (input: CreateReviewInput) => void;
  resetDemoData: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const id = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setState(raw ? JSON.parse(raw) : seededState);
    } catch { setState(seededState); }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state, hydrated]);

  const signup = useCallback<StoreContextValue["signup"]>((input) => {
    const email = input.email.trim().toLowerCase();
    if (!input.name.trim()) return { ok: false, error: "Please enter your name." };
    if (!/^\S+@\S+\.\S+$/.test(email)) return { ok: false, error: "Please enter a valid email." };
    if (input.password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

    let error: string | undefined;
    setState((s) => {
      if (s.users.some((u) => u.email === email)) {
        error = "An account with this email already exists."; return s;
      }
      const userId = id("u");
      const profileId = id("p");
      const newUser: User = {
        id: userId, email, password: input.password, name: input.name.trim(),
        role: input.role, createdAt: new Date().toISOString(),
      };
      const newProfile: Profile = {
        id: profileId, userId, displayName: input.name.trim(), role: input.role,
        city: input.city, tagline: "", bio: "", categories: [],
        verified: false, avatar: `https://i.pravatar.cc/200?u=${userId}`,
        portfolioUrls: [], rating: 0, reviewCount: 0, createdAt: new Date().toISOString(),
      };
      return { ...s, users: [...s.users, newUser], profiles: [...s.profiles, newProfile], currentUserId: userId };
    });
    return error ? { ok: false, error } : { ok: true };
  }, []);

  const login = useCallback<StoreContextValue["login"]>((input) => {
    const email = input.email.trim().toLowerCase();
    let error: string | undefined;
    setState((s) => {
      const user = s.users.find((u) => u.email === email && u.password === input.password);
      if (!user) { error = "Email or password is incorrect."; return s; }
      return { ...s, currentUserId: user.id };
    });
    return error ? { ok: false, error } : { ok: true };
  }, []);

  const demoLogin = useCallback(() => setState((s) => ({ ...s, currentUserId: "u-demo" })), []);
  const logout = useCallback(() => setState((s) => ({ ...s, currentUserId: null })), []);
  const resetDemoData = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setState({ ...seededState, currentUserId: null });
  }, []);

  const createBrief = useCallback<StoreContextValue["createBrief"]>((input) => {
    let brief: Brief | undefined;
    setState((s) => {
      brief = { id: id("b"), ...input, status: "open", createdAt: new Date().toISOString() };
      return { ...s, briefs: [brief!, ...s.briefs] };
    });
    return brief;
  }, []);

  const createProposal = useCallback<StoreContextValue["createProposal"]>((input) => {
    let proposal: Proposal | undefined;
    setState((s) => {
      const brief = s.briefs.find((b) => b.id === input.briefId);
      if (!brief) return s;
      const provider = s.profiles.find((p) => p.id === input.providerId);
      const organiser = s.profiles.find((p) => p.id === brief.organiserId);
      if (!provider || !organiser) return s;

      proposal = {
        id: id("pr"), briefId: input.briefId, providerId: input.providerId,
        message: input.message, price: input.price, status: "submitted",
        createdAt: new Date().toISOString(),
      };

      const preview = `Proposal for "${brief.title}" — €${input.price.toLocaleString()}. ${input.message.slice(0, 70)}${input.message.length > 70 ? "…" : ""}`;
      const existingThread = s.threads.find(
        (t) => t.briefId === input.briefId &&
          (t.participantAId === provider.userId || t.participantBId === provider.userId)
      );

      let threads = s.threads;
      let messages = s.messages;

      if (existingThread) {
        threads = s.threads.map((t) =>
          t.id === existingThread.id
            ? { ...t, lastMessage: preview, lastMessageAt: proposal!.createdAt, proposalId: proposal!.id }
            : t
        );
      } else {
        const newThread: Thread = {
          id: id("th"), briefId: input.briefId, proposalId: proposal.id,
          participantAId: organiser.userId, participantBId: provider.userId,
          participantAName: organiser.displayName, participantBName: provider.displayName,
          participantAAvatar: organiser.avatar, participantBAvatar: provider.avatar,
          lastMessage: preview, lastMessageAt: proposal.createdAt, createdAt: proposal.createdAt,
        };
        threads = [newThread, ...s.threads];
        messages = [...s.messages, {
          id: id("m"), threadId: newThread.id, senderId: provider.userId,
          body: preview, createdAt: proposal.createdAt,
        }];
      }

      return { ...s, proposals: [proposal, ...s.proposals], threads, messages };
    });
    return proposal;
  }, []);

  const updateProposalStatus = useCallback<StoreContextValue["updateProposalStatus"]>(
    (proposalId, status) => {
      setState((s) => {
        const proposal = s.proposals.find((p) => p.id === proposalId);
        if (!proposal) return s;
        const brief = s.briefs.find((b) => b.id === proposal.briefId);
        if (!brief) return s;

        let proposals = s.proposals.map((p) =>
          p.id === proposalId ? { ...p, status } : p
        );
        let briefs = s.briefs;
        let collaborations = s.collaborations;

        if (status === "accepted") {
          proposals = proposals.map((p) =>
            p.briefId === proposal.briefId && p.id !== proposalId && p.status === "submitted"
              ? { ...p, status: "declined" as const } : p
          );
          briefs = briefs.map((b) =>
            b.id === proposal.briefId ? { ...b, status: "in_progress" as const } : b
          );
          const exists = collaborations.find(
            (c) => c.briefId === proposal.briefId && c.providerId === proposal.providerId
          );
          if (!exists) {
            collaborations = [...collaborations, {
              id: id("col"),
              briefId: proposal.briefId,
              organiserId: brief.organiserId,
              providerId: proposal.providerId,
              organiserConfirmed: true,
              providerConfirmed: false,
              createdAt: new Date().toISOString(),
            }];
          }
        }

        return { ...s, proposals, briefs, collaborations };
      });
    },
    []
  );

  const updateProfile = useCallback<StoreContextValue["updateProfile"]>((input) => {
    setState((s) => ({
      ...s,
      profiles: s.profiles.map((p) => (p.id === input.id ? { ...p, ...input } : p)),
    }));
  }, []);

  const sendMessage = useCallback<StoreContextValue["sendMessage"]>(
    (threadId, body, senderId) => {
      setState((s) => {
        const now = new Date().toISOString();
        const newMsg: Message = { id: id("m"), threadId, senderId, body, createdAt: now };
        return {
          ...s,
          messages: [...s.messages, newMsg],
          threads: s.threads.map((t) =>
            t.id === threadId
              ? { ...t, lastMessage: body.slice(0, 80), lastMessageAt: now }
              : t
          ),
        };
      });
    },
    []
  );

  const confirmCollaboration = useCallback<StoreContextValue["confirmCollaboration"]>(
    (collaborationId, profileId) => {
      setState((s) => {
        const collab = s.collaborations.find((c) => c.id === collaborationId);
        if (!collab) return s;

        let updated = { ...collab };
        if (collab.organiserId === profileId) updated.organiserConfirmed = true;
        if (collab.providerId === profileId) updated.providerConfirmed = true;

        const completed = updated.organiserConfirmed && updated.providerConfirmed;
        if (completed && !updated.completedAt) {
          updated.completedAt = new Date().toISOString();
        }

        let briefs = s.briefs;
        if (completed) {
          briefs = briefs.map((b) =>
            b.id === collab.briefId ? { ...b, status: "closed" as const } : b
          );
        }

        return {
          ...s,
          collaborations: s.collaborations.map((c) => (c.id === collaborationId ? updated : c)),
          briefs,
        };
      });
    },
    []
  );

  const createReview = useCallback<StoreContextValue["createReview"]>((input) => {
    setState((s) => {
      const exists = s.reviews.find(
        (r) => r.collaborationId === input.collaborationId && r.authorId === input.authorId
      );
      if (exists) return s;

      const newReview: Review = {
        id: id("rv"), ...input, createdAt: new Date().toISOString(),
      };

      const profiles = s.profiles.map((p) => {
        if (p.id !== input.targetId) return p;
        const oldRating = p.rating ?? 0;
        const oldCount = p.reviewCount ?? 0;
        const newCount = oldCount + 1;
        const newRating = oldCount === 0
          ? input.rating
          : (oldRating * oldCount + input.rating) / newCount;
        return {
          ...p,
          rating: Math.round(newRating * 10) / 10,
          reviewCount: newCount,
        };
      });

      return { ...s, reviews: [newReview, ...s.reviews], profiles };
    });
  }, []);

  const value = useMemo<StoreContextValue>(() => {
    const me = state.users.find((u) => u.id === state.currentUserId) ?? null;
    const myProfile = me ? state.profiles.find((p) => p.userId === me.id) ?? null : null;
    return {
      ...state, hydrated, me, myProfile,
      signup, login, demoLogin, logout,
      getProfileById: (pid) => state.profiles.find((p) => p.id === pid),
      getProfileByUserId: (uid) => state.profiles.find((p) => p.userId === uid),
      getBriefById: (bid) => state.briefs.find((b) => b.id === bid),
      getProposalsForBrief: (bid) => state.proposals.filter((p) => p.briefId === bid),
      getMessagesForThread: (tid) =>
        state.messages.filter((m) => m.threadId === tid)
          .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
      getReviewsForProfile: (pid) =>
        state.reviews.filter((r) => r.targetId === pid)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      getThreadsForUser: (uid) =>
        state.threads.filter((t) => t.participantAId === uid || t.participantBId === uid)
          .sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt)),
      getThreadById: (id) => state.threads.find((t) => t.id === id),
      getCollaborationForBrief: (bid) =>
        state.collaborations.find((c) => c.briefId === bid),
      getPendingReviews: (profileId) =>
        state.collaborations
          .filter((c) => c.completedAt)
          .filter((c) => c.organiserId === profileId || c.providerId === profileId)
          .filter((c) => !state.reviews.some(
            (r) => r.collaborationId === c.id && r.authorId === profileId
          ))
          .map((c) => {
            const targetId = c.organiserId === profileId ? c.providerId : c.organiserId;
            const target = state.profiles.find((p) => p.id === targetId);
            const brief = state.briefs.find((b) => b.id === c.briefId);
            return target ? { collaboration: c, target, brief } : null;
          })
          .filter((x): x is { collaboration: Collaboration; target: Profile; brief: Brief | undefined } => x !== null),
      createBrief, createProposal, updateProposalStatus, updateProfile,
      sendMessage, confirmCollaboration, createReview, resetDemoData,
    };
  }, [state, hydrated, signup, login, demoLogin, logout, createBrief, createProposal, updateProposalStatus, updateProfile, sendMessage, confirmCollaboration, createReview, resetDemoData]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}