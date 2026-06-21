export interface UserStats {
  projectsBuilt: number;
  eventsAttended: number;
  streakDays: number;
  contributions: number;
  badges: string[];
}

export interface UserActivity {
  type: string;
  message: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  bio: string;
  skills: string[];
  interests: string[];
  joinDate: string;
  stats: UserStats;
  activity: UserActivity[];
}

export const USERS: User[] = [];

export const CURRENT_USER: User = {
  id: "",
  name: "",
  email: "",
  role: "student",
  avatar: null,
  bio: "",
  skills: [],
  interests: [],
  joinDate: "",
  stats: {
    projectsBuilt: 0,
    eventsAttended: 0,
    streakDays: 0,
    contributions: 0,
    badges: [],
  },
  activity: [],
};

export const ADMIN_STATS = {
  totalUsers: 0,
  activeEvents: 0,
  submissions: 0,
  categories: 0,
  growthData: [] as { month: string; users: number }[],
  categoryBreakdown: [] as { name: string; members: number }[],
  skillDistribution: [] as { name: string; value: number }[],
};

export type { User as UserType };
