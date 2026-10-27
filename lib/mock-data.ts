import type {
  User, Profile, Brief, Proposal, Thread, Message, Review, Collaboration,
} from "./types";

const now = Date.now();
const iso = (daysAgo: number) => new Date(now - daysAgo * 86400000).toISOString();

export const seedUsers: User[] = [
  { id: "u-demo", email: "demo@vibenet.io",   password: "demo1234", name: "Demo User",     role: "organiser", createdAt: iso(30) },
  { id: "u-maya", email: "maya@aria.events",  password: "pass1234", name: "Maya Ferreira", role: "organiser", createdAt: iso(45) },
  { id: "u-theo", email: "theo@north.events", password: "pass1234", name: "Theo Almeida",  role: "organiser", createdAt: iso(60) },
  { id: "u-lina", email: "lina@linaflorals",  password: "pass1234", name: "Lina Costa",    role: "organiser", createdAt: iso(20) },
  { id: "u-aria", email: "hello@aria.venue",  password: "pass1234", name: "Aria Events",   role: "venue",     createdAt: iso(90) },
  { id: "u-tide", email: "hi@tidehouse.pt",   password: "pass1234", name: "Tide House",    role: "venue",     createdAt: iso(70) },
  { id: "u-casa", email: "book@casanova.pt",  password: "pass1234", name: "Casa Nova",     role: "venue",     createdAt: iso(40) },
  { id: "u-koda", email: "koda@music.pt",     password: "pass1234", name: "Koda",          role: "artist",    createdAt: iso(15) },
  { id: "u-una",  email: "una@strings.pt",    password: "pass1234", name: "Una Strings",   role: "artist",    createdAt: iso(50) },
  { id: "u-rio",  email: "rio@rio.dj",        password: "pass1234", name: "Rio Silva",     role: "artist",    createdAt: iso(25) },
  { id: "u-bloom",email: "info@bloom.studio", password: "pass1234", name: "Bloom Studio",  role: "vendor",    createdAt: iso(80) },
  { id: "u-ember",email: "hi@emberkitchen",   password: "pass1234", name: "Ember Kitchen", role: "vendor",    createdAt: iso(55) },
  { id: "u-pulse",email: "team@pulseav.pt",   password: "pass1234", name: "Pulse AV",      role: "vendor",    createdAt: iso(35) },
];

export const seedProfiles: Profile[] = [
  { id: "p-demo", userId: "u-demo", displayName: "Demo User", role: "organiser", city: "Lisbon", tagline: "Planning bold events since 2020.", bio: "Independent planner focused on product launches and corporate off-sites. I care about atmosphere, details, and good collaborators.", categories: ["Corporate", "Product Launch"], budgetMin: 5000, budgetMax: 40000, verified: true, avatar: "https://i.pravatar.cc/200?img=12", coverUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200", portfolioUrls: [], rating: 4.9, reviewCount: 12, createdAt: iso(30) },
  { id: "p-maya", userId: "u-maya", displayName: "Maya Ferreira", role: "organiser", city: "Lisbon", tagline: "Weddings with a modern edge.", bio: "Boutique wedding planner. 40+ weddings in Lisbon, Cascais, and Comporta. Obsessed with natural light and thoughtful details.", categories: ["Wedding", "Private Party"], budgetMin: 15000, budgetMax: 80000, verified: true, avatar: "https://i.pravatar.cc/200?img=47", coverUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200", portfolioUrls: [], rating: 5.0, reviewCount: 28, createdAt: iso(45) },
  { id: "p-theo", userId: "u-theo", displayName: "Theo Almeida", role: "organiser", city: "Porto", tagline: "Conference producer. Data nerd.", bio: "I produce tech conferences across Portugal. Looking for venues with excellent AV and vendors who get logistics.", categories: ["Conference", "Corporate"], budgetMin: 20000, budgetMax: 150000, verified: true, avatar: "https://i.pravatar.cc/200?img=33", coverUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200", portfolioUrls: [], rating: 4.8, reviewCount: 9, createdAt: iso(60) },
  { id: "p-lina", userId: "u-lina", displayName: "Lina Costa", role: "organiser", city: "Barcelona", tagline: "Small events, big feelings.", bio: "I curate intimate workshops and dinners. Always looking for interesting artists and chefs to collaborate with.", categories: ["Workshop", "Private Party"], budgetMin: 2000, budgetMax: 15000, verified: false, avatar: "https://i.pravatar.cc/200?img=25", portfolioUrls: [], rating: 4.7, reviewCount: 4, createdAt: iso(20) },
  { id: "p-aria", userId: "u-aria", displayName: "Aria Events", role: "venue", city: "Lisbon", tagline: "A converted warehouse with soul.", bio: "Industrial-chic venue in Alcântara. 120 seated, 250 standing. Full AV, in-house bar, natural light, and the best terrace in Lisbon.", categories: ["Event Space", "Bar & Drinks"], budgetMin: 3000, budgetMax: 25000, verified: true, avatar: "https://i.pravatar.cc/200?img=68", coverUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200", portfolioUrls: [], rating: 4.9, reviewCount: 41, createdAt: iso(90) },
  { id: "p-tide", userId: "u-tide", displayName: "Tide House", role: "venue", city: "Lisbon", tagline: "Seafront events in Cascais.", bio: "Oceanfront venue in Cascais. Sunset ceremonies, coastal receptions, and a private beach. Capacity: 150 seated.", categories: ["Event Space"], budgetMin: 5000, budgetMax: 30000, verified: true, avatar: "https://i.pravatar.cc/200?img=44", coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200", portfolioUrls: [], rating: 4.8, reviewCount: 19, createdAt: iso(70) },
  { id: "p-casa", userId: "u-casa", displayName: "Casa Nova", role: "venue", city: "Porto", tagline: "A townhouse for intimate events.", bio: "Historic townhouse in Porto's old town. Perfect for dinners, workshops, and small launches. 60 seated.", categories: ["Event Space"], budgetMin: 1500, budgetMax: 8000, verified: false, avatar: "https://i.pravatar.cc/200?img=59", coverUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200", portfolioUrls: [], rating: 4.6, reviewCount: 7, createdAt: iso(40) },
  { id: "p-koda", userId: "u-koda", displayName: "Koda", role: "artist", city: "Lisbon", tagline: "Live electronic sets. All vibes.", bio: "Producer & live act. Deep house, organic house, sunset sets. Played at festivals and private events across Europe.", categories: ["Entertainment", "Music"], budgetMin: 800, budgetMax: 4000, verified: true, avatar: "https://i.pravatar.cc/200?img=15", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200", portfolioUrls: [], rating: 5.0, reviewCount: 22, createdAt: iso(15) },
  { id: "p-una", userId: "u-una", displayName: "Una Strings", role: "artist", city: "Porto", tagline: "String quartets for modern events.", bio: "Contemporary string quartet. We arrange everything from Bach to Billie Eilish. Weddings, launches, proposals.", categories: ["Entertainment", "Music"], budgetMin: 600, budgetMax: 2500, verified: true, avatar: "https://i.pravatar.cc/200?img=32", coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200", portfolioUrls: [], rating: 4.9, reviewCount: 14, createdAt: iso(50) },
  { id: "p-rio", userId: "u-rio", displayName: "Rio Silva", role: "artist", city: "Barcelona", tagline: "DJ · vinyl only · disco & funk.", bio: "Vinyl DJ specialising in disco, funk, and Brazilian grooves. Ideal for cocktail hours and after-parties.", categories: ["Entertainment", "Music"], budgetMin: 400, budgetMax: 1800, verified: false, avatar: "https://i.pravatar.cc/200?img=8", portfolioUrls: [], rating: 4.7, reviewCount: 6, createdAt: iso(25) },
  { id: "p-bloom", userId: "u-bloom", displayName: "Bloom Studio", role: "vendor", city: "Lisbon", tagline: "Florals that don't look like florals.", bio: "We do sculptural, seasonal florals for weddings and events. No two arrangements alike. Local, seasonal, sustainable.", categories: ["Décor & Florals"], budgetMin: 500, budgetMax: 6000, verified: true, avatar: "https://i.pravatar.cc/200?img=5", coverUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1200", portfolioUrls: [], rating: 4.8, reviewCount: 33, createdAt: iso(80) },
  { id: "p-ember", userId: "u-ember", displayName: "Ember Kitchen", role: "vendor", city: "Lisbon", tagline: "Fire-cooked food, event-ready.", bio: "Wood-fired catering for events of all sizes. We source from local farms, cook over live fire, and plate beautifully.", categories: ["Catering", "Bar & Drinks"], budgetMin: 1500, budgetMax: 15000, verified: true, avatar: "https://i.pravatar.cc/200?img=52", coverUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200", portfolioUrls: [], rating: 4.9, reviewCount: 27, createdAt: iso(55) },
  { id: "p-pulse", userId: "u-pulse", displayName: "Pulse AV", role: "vendor", city: "Porto", tagline: "Sound and light, dialled in.", bio: "AV production for conferences and live shows. Line arrays, LED walls, lighting design. Full technical crew.", categories: ["AV & Sound", "Lighting"], budgetMin: 800, budgetMax: 12000, verified: true, avatar: "https://i.pravatar.cc/200?img=11", portfolioUrls: [], rating: 4.7, reviewCount: 18, createdAt: iso(35) },
];

export const seedBriefs: Brief[] = [
  { id: "b-001", organiserId: "p-demo", title: "Product launch — rooftop, 120 people", eventType: "Product Launch", city: "Lisbon", eventDate: new Date(now + 30 * 86400000).toISOString(), guestCount: 120, budgetMin: 8000, budgetMax: 15000, description: "Looking for a venue + catering combo for a startup product launch. Rooftop or warehouse vibe. Sunset start, 3-hour reception. Vegetarian-friendly menu required.", status: "open", createdAt: iso(3) },
  { id: "b-002", organiserId: "p-maya", title: "Intimate wedding — 60 guests, Cascais", eventType: "Wedding", city: "Lisbon", eventDate: new Date(now + 90 * 86400000).toISOString(), guestCount: 60, budgetMin: 20000, budgetMax: 35000, description: "Modern, minimal wedding. Needs: oceanfront venue, florals with an editorial edge, string quartet, wood-fired catering. No generic wedding stuff, please.", status: "in_progress", createdAt: iso(8) },
  { id: "b-003", organiserId: "p-theo", title: "Tech conference — 400 attendees, Porto", eventType: "Conference", city: "Porto", eventDate: new Date(now + 120 * 86400000).toISOString(), guestCount: 400, budgetMin: 60000, budgetMax: 100000, description: "Two-day conference. Need: venue for 400, full AV production, catering for both days, and a DJ for the after-party. Sound and lighting quality is non-negotiable.", status: "open", createdAt: iso(5) },
  { id: "b-004", organiserId: "p-lina", title: "Supper club — 40 guests, Barcelona", eventType: "Private Party", city: "Barcelona", eventDate: new Date(now + 20 * 86400000).toISOString(), guestCount: 40, budgetMin: 3000, budgetMax: 6000, description: "Intimate dinner series in a private space. Looking for chef + florals + vinyl DJ. Warm, candlelit, minimal.", status: "open", createdAt: iso(2) },
  { id: "b-005", organiserId: "p-demo", title: "Corporate off-site — half-day, 80 people", eventType: "Corporate", city: "Lisbon", eventDate: new Date(now + 45 * 86400000).toISOString(), guestCount: 80, budgetMin: 5000, budgetMax: 12000, description: "Half-day team off-site. Venue with natural light and good AV, coffee + lunch, and a short live music set to close. Simple, but done well.", status: "closed", createdAt: iso(20) },
];

export const seedProposals: Proposal[] = [
  { id: "pr-001", briefId: "b-002", providerId: "p-tide", message: "Tide House would be a beautiful fit for this. We have a private beach area perfect for sunset ceremonies and can seat 60 comfortably. Available on your date — happy to walk you through a sample layout.", price: 18000, status: "accepted", createdAt: iso(6) },
  { id: "pr-002", briefId: "b-002", providerId: "p-bloom", message: "Would love to design the florals. Our spring palette (smoke, blush, raw green) would sit perfectly with a coastal setting. Can share a moodboard within 24h.", price: 3200, status: "submitted", createdAt: iso(5) },
  { id: "pr-003", briefId: "b-002", providerId: "p-una", message: "Our quartet would be honoured. We can arrange a custom set for the ceremony — think modern strings, cinematic. Sample playlist available on request.", price: 1800, status: "submitted", createdAt: iso(4) },
  { id: "pr-004", briefId: "b-003", providerId: "p-pulse", message: "Pulse AV is built for conferences at this scale. We can handle main stage, breakout rooms, and live streaming. Two-day crew included. Sending a full spec sheet.", price: 34000, status: "submitted", createdAt: iso(3) },
];

export const seedCollaborations: Collaboration[] = [
  { id: "col-001", briefId: "b-005", organiserId: "p-demo", providerId: "p-ember", organiserConfirmed: true, providerConfirmed: true, completedAt: iso(10), createdAt: iso(25) },
];

export const seedReviews: Review[] = [
  { id: "rv-001", collaborationId: "col-001", authorId: "p-demo", targetId: "p-ember", rating: 5, body: "Ember absolutely nailed the off-site lunch. Thoughtful menu, on time, zero drama. Will book again.", createdAt: iso(9) },
  { id: "rv-002", collaborationId: "col-001", authorId: "p-ember", targetId: "p-demo", rating: 5, body: "Great organiser to work with — clear brief, prompt communication, paid on time. Highly recommend.", createdAt: iso(9) },
  { id: "rv-003", collaborationId: "col-001", authorId: "p-maya", targetId: "p-tide", rating: 5, body: "Worked with Tide House on two weddings this year. Photogenic, professional, and the sunset is unreal.", createdAt: iso(30) },
];

export const seedThreads: Thread[] = [
  { id: "th-001", briefId: "b-002", proposalId: "pr-001", participantAId: "u-maya", participantBId: "u-tide", participantAName: "Maya Ferreira", participantBName: "Tide House", participantAAvatar: "https://i.pravatar.cc/200?img=47", participantBAvatar: "https://i.pravatar.cc/200?img=44", lastMessage: "Perfect — let's lock in a site visit for next Thursday?", lastMessageAt: iso(1), createdAt: iso(6) },
  { id: "th-002", briefId: "b-002", proposalId: "pr-002", participantAId: "u-maya", participantBId: "u-bloom", participantAName: "Maya Ferreira", participantBName: "Bloom Studio", participantAAvatar: "https://i.pravatar.cc/200?img=47", participantBAvatar: "https://i.pravatar.cc/200?img=5", lastMessage: "Loved the moodboard — the smoke tones are exactly right.", lastMessageAt: iso(2), createdAt: iso(5) },
  { id: "th-003", participantAId: "u-theo", participantBId: "u-pulse", participantAName: "Theo Almeida", participantBName: "Pulse AV", participantAAvatar: "https://i.pravatar.cc/200?img=33", participantBAvatar: "https://i.pravatar.cc/200?img=11", lastMessage: "Can you share the rig specs for the main stage?", lastMessageAt: iso(0), createdAt: iso(3) },
];

export const seedMessages: Message[] = [
  { id: "m-001", threadId: "th-001", senderId: "u-maya", body: "Hi! Loved your proposal — the beach area is exactly what we're after.", createdAt: iso(6) },
  { id: "m-002", threadId: "th-001", senderId: "u-tide", body: "So glad to hear it. Happy to send over a sample layout and a few recent ceremony photos.", createdAt: iso(5) },
  { id: "m-003", threadId: "th-001", senderId: "u-maya", body: "Yes please. Also — is there flexibility on load-in time? Our florist will need a couple of hours.", createdAt: iso(4) },
  { id: "m-004", threadId: "th-001", senderId: "u-tide", body: "Absolutely, we open the venue at 8am. Full day is yours.", createdAt: iso(2) },
  { id: "m-005", threadId: "th-001", senderId: "u-maya", body: "Perfect — let's lock in a site visit for next Thursday?", createdAt: iso(1) },
  { id: "m-010", threadId: "th-002", senderId: "u-maya", body: "Thanks for the fast reply. Sent you a few inspo images.", createdAt: iso(5) },
  { id: "m-011", threadId: "th-002", senderId: "u-bloom", body: "Got them — I'll put together a moodboard tonight.", createdAt: iso(3) },
  { id: "m-012", threadId: "th-002", senderId: "u-maya", body: "Loved the moodboard — the smoke tones are exactly right.", createdAt: iso(2) },
  { id: "m-020", threadId: "th-003", senderId: "u-theo", body: "Hey, thanks for the proposal. Quick question on crew size.", createdAt: iso(3) },
  { id: "m-021", threadId: "th-003", senderId: "u-pulse", body: "4 people for main stage, 2 for breakouts. All included.", createdAt: iso(2) },
  { id: "m-022", threadId: "th-003", senderId: "u-theo", body: "Can you share the rig specs for the main stage?", createdAt: iso(0) },
];