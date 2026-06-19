export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const TEAM: TeamMember[] = [];
