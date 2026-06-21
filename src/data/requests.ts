export interface Request {
  id: string;
  name: string;
  email: string;
  status: string;
  message: string;
  skills: string[];
  experience: string;
  date: string;
}

export const REQUESTS: Request[] = [];
