export const EVENTS = [
  {
    id: "e1",
    title: "React Workshop for Beginners",
    date: "2026-05-15T18:00:00Z",
    category: "Web Development",
    attendees: 120,
    maxAttendees: 150,
    type: "Workshop",
    description: "Hands-on introduction to React hooks, state management, and building your first app.",
    host: "Sarah Chen",
    location: "Online"
  },
  {
    id: "e2",
    title: "Hackathon: AI Innovations",
    date: "2026-06-01T09:00:00Z",
    category: "AI/ML",
    attendees: 300,
    maxAttendees: 500,
    type: "Hackathon",
    description: "48-hour hackathon focused on building AI-powered solutions to real-world problems.",
    host: "Codrithm Team",
    location: "Online + In-person"
  },
  {
    id: "e3",
    title: "Cybersecurity CTF Challenge",
    date: "2026-05-25T10:00:00Z",
    category: "Cybersecurity",
    attendees: 85,
    maxAttendees: 100,
    type: "Competition",
    description: "Test your security skills in this beginner-to-advanced CTF challenge.",
    host: "DefSec Club",
    location: "Online"
  },
  {
    id: "e4",
    title: "Open Source Contribution Sprint",
    date: "2026-06-10T14:00:00Z",
    category: "Open Source",
    attendees: 45,
    maxAttendees: 200,
    type: "Sprint",
    description: "Work alongside mentors to make your first open source contribution.",
    host: "OSS Community",
    location: "Online"
  },
  {
    id: "e5",
    title: "UI/UX Design Bootcamp",
    date: "2026-06-20T09:00:00Z",
    category: "UI/UX Design",
    attendees: 60,
    maxAttendees: 80,
    type: "Bootcamp",
    description: "Two-day intensive on Figma, design systems, and user research methodologies.",
    host: "Design Collective",
    location: "Online"
  }
];

export type Event = typeof EVENTS[0];
