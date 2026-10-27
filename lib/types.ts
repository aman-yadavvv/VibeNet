export type Role = "organiser" | "venue" | "artist" | "vendor";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: string;
};

export type Profile = {
  id: string;
  userId: string;
  displayName: string;
  role: Role;
  city: string;
  tagline: string;
  bio: string;
  categories: string[];
  budgetMin?: number;
  budgetMax?: number;
  verified: boolean;
  avatar: string;
  coverUrl?: string;
  portfolioUrls: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
};

export type BriefStatus = "open" | "in_progress" | "closed";

export type Brief = {
  id: string;
  organiserId: string;
  title: string;
  eventType: string;
  city: string;
  eventDate: string;
  guestCount: number;
  budgetMin: number;
  budgetMax: number;
  description: string;
  status: BriefStatus;
  createdAt: string;
};

export type ProposalStatus = "submitted" | "accepted" | "declined" | "withdrawn";

export type Proposal = {
  id: string;
  briefId: string;
  providerId: string;
  message: string;
  price: number;
  status: ProposalStatus;
  createdAt: string;
};

export type Thread = {
  id: string;
  briefId?: string;
  proposalId?: string;
  participantAId: string;
  participantBId: string;
  participantAName: string;
  participantBName: string;
  participantAAvatar: string;
  participantBAvatar: string;
  lastMessage: string;
  lastMessageAt: string;
  createdAt: string;
};

export type Message = {
  id: string;
  threadId: string;
  senderId: string;
  body: string;
  createdAt: string;
  readAt?: string;
};

export type Collaboration = {
  id: string;
  briefId: string;
  organiserId: string;
  providerId: string;
  organiserConfirmed: boolean;
  providerConfirmed: boolean;
  completedAt?: string;
  createdAt: string;
};

export type Review = {
  id: string;
  collaborationId: string;
  authorId: string;
  targetId: string;
  rating: number;
  body: string;
  createdAt: string;
};