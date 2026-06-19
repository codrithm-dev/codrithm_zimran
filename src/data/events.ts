export interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  type: string;
  description: string;
  host: string;
  location: string;
}

export const EVENTS: Event[] = [];
