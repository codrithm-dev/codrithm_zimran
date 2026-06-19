export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export const CAREERS: Career[] = [];

export const CAREER_TYPES = ["All", "Full-time", "Internship", "Volunteer"];
