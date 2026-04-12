export const USERS = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "alex@codrithm.dev",
    role: "student",
    avatar: null,
    bio: "Full-stack dev student passionate about building tools that help other students learn faster.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
    interests: ["Web Development", "Open Source", "DevOps"],
    joinDate: "2023-09-01",
    stats: {
      projectsBuilt: 12,
      eventsAttended: 5,
      streakDays: 14,
      contributions: 47,
      badges: ["Early Adopter", "Hackathon Winner", "Open Source Hero"]
    },
    activity: [
      { type: "project", message: "Published 'Task Manager Pro' on GitHub", date: "2026-04-10" },
      { type: "event", message: "Attended React Workshop for Beginners", date: "2026-04-05" },
      { type: "badge", message: "Earned 'Hackathon Winner' badge", date: "2026-03-28" },
      { type: "contribution", message: "Contributed to 3 open source repos", date: "2026-03-20" }
    ]
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "priya@codrithm.dev",
    role: "student",
    avatar: null,
    bio: "ML engineer in training. Fascinated by the intersection of AI and social good.",
    skills: ["Python", "TensorFlow", "Data Analysis", "SQL", "Jupyter"],
    interests: ["AI/ML", "Data Science", "Research"],
    joinDate: "2023-10-15",
    stats: {
      projectsBuilt: 8,
      eventsAttended: 12,
      streakDays: 42,
      contributions: 23,
      badges: ["Data Wizard", "Hackathon Participant"]
    },
    activity: []
  },
  {
    id: "u3",
    name: "Jordan Lee",
    email: "jordan@university.edu",
    role: "mentor",
    avatar: null,
    bio: "Senior dev and open source contributor. Here to give back to the community.",
    skills: ["Golang", "Kubernetes", "System Design", "PostgreSQL", "Redis"],
    interests: ["DevOps", "Open Source", "Architecture"],
    joinDate: "2023-08-01",
    stats: {
      projectsBuilt: 50,
      eventsAttended: 30,
      streakDays: 120,
      contributions: 210,
      badges: ["Mentor", "Core Contributor", "Community Leader"]
    },
    activity: []
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@codrithm.dev",
    role: "admin",
    avatar: null,
    bio: "Platform administrator.",
    skills: ["Architecture", "DevOps", "Management"],
    interests: ["Platform", "Growth"],
    joinDate: "2023-01-01",
    stats: {
      projectsBuilt: 0,
      eventsAttended: 0,
      streakDays: 365,
      contributions: 0,
      badges: ["Admin"]
    },
    activity: []
  }
];

export const CURRENT_USER = USERS[0];

export const ADMIN_STATS = {
  totalUsers: 3250,
  activeEvents: 5,
  submissions: 89,
  categories: 10,
  growthData: [
    { month: "Nov", users: 1800 },
    { month: "Dec", users: 2100 },
    { month: "Jan", users: 2300 },
    { month: "Feb", users: 2650 },
    { month: "Mar", users: 2950 },
    { month: "Apr", users: 3250 }
  ],
  categoryBreakdown: [
    { name: "Web Dev", members: 1240 },
    { name: "AI/ML", members: 1050 },
    { name: "Open Source", members: 960 },
    { name: "Mobile", members: 890 },
    { name: "Data Science", members: 810 },
    { name: "Game Dev", members: 730 }
  ],
  skillDistribution: [
    { name: "JavaScript", value: 35 },
    { name: "Python", value: 28 },
    { name: "TypeScript", value: 18 },
    { name: "Go / Rust", value: 10 },
    { name: "Other", value: 9 }
  ]
};

export type User = typeof USERS[0];
