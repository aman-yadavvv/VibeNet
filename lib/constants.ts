export const ROLE_META = {
  organiser: {
    label: "Organiser",
    plural: "Organisers",
    blurb: "Plan events, find partners, book talent.",
    gradient: "from-violet to-pink",
    icon: "Users",
  },
  venue: {
    label: "Venue",
    plural: "Venues",
    blurb: "List your space, get discovered.",
    gradient: "from-pink to-coral",
    icon: "Building2",
  },
  artist: {
    label: "Artist",
    plural: "Artists",
    blurb: "Showcase your work, get booked.",
    gradient: "from-coral to-lime",
    icon: "Music",
  },
  vendor: {
    label: "Vendor",
    plural: "Vendors",
    blurb: "Offer your services, build repeat clients.",
    gradient: "from-mint to-violet",
    icon: "Store",
  },
} as const;

export const ROLES = Object.keys(ROLE_META) as Array<keyof typeof ROLE_META>;

export const CITIES = [
  "Lisbon", "Porto", "Barcelona", "Madrid",
  "Paris", "London", "Berlin", "Amsterdam",
];

export const CATEGORIES = [
  "Catering", "Décor & Florals", "AV & Sound", "Photography",
  "Entertainment", "Bar & Drinks", "Staffing", "Lighting",
  "Event Space", "Music",
];

export const EVENT_TYPES = [
  "Wedding", "Corporate", "Conference", "Product Launch",
  "Birthday", "Festival", "Private Party", "Workshop", "Gala",
];