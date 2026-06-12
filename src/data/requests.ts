export const REQUESTS = [
  {
    id: "r1",
    name: "Sam Smith",
    email: "sam@university.edu",
    status: "Pending",
    message: "I want to learn web development and build my first project!",
    skills: ["HTML", "CSS"],
    experience: "Beginner",
    date: "2026-04-12"
  },
  {
    id: "r2",
    name: "Aisha Mohammed",
    email: "aisha@college.edu",
    status: "Pending",
    message: "Experienced in Python and ML, looking to connect with like-minded students.",
    skills: ["Python", "NumPy", "Pandas"],
    experience: "Intermediate",
    date: "2026-04-11"
  },
  {
    id: "r3",
    name: "Carlos Mendez",
    email: "carlos@tech.edu",
    status: "Approved",
    message: "Frontend developer, 2 years React experience. Excited to contribute!",
    skills: ["React", "CSS", "JavaScript"],
    experience: "Intermediate",
    date: "2026-04-10"
  },
  {
    id: "r4",
    name: "Yuna Park",
    email: "yuna@uni.edu",
    status: "Rejected",
    message: "Looking for networking opportunities in the AI space.",
    skills: ["TensorFlow", "Python"],
    experience: "Beginner",
    date: "2026-04-09"
  },
  {
    id: "r5",
    name: "Dmitri Volkov",
    email: "dmitri@institute.edu",
    status: "Pending",
    message: "Systems programmer interested in DevOps and cloud infrastructure.",
    skills: ["Golang", "Docker", "Linux"],
    experience: "Advanced",
    date: "2026-04-09"
  },
  {
    id: "r6",
    name: "Layla Hassan",
    email: "layla@campus.edu",
    status: "Pending",
    message: "UI/UX designer transitioning into frontend development.",
    skills: ["Figma", "HTML", "CSS"],
    experience: "Beginner",
    date: "2026-04-08"
  },
  {
    id: "r7",
    name: "Noah Williams",
    email: "noah@techschool.edu",
    status: "Approved",
    message: "Fullstack developer, FOSS enthusiast. Would love to mentor newcomers.",
    skills: ["Node.js", "React", "PostgreSQL"],
    experience: "Advanced",
    date: "2026-04-07"
  },
  {
    id: "r8",
    name: "Mei Zhang",
    email: "mei@cs.university.edu",
    status: "Pending",
    message: "Computer science student interested in game development with Unity.",
    skills: ["C#", "Unity", "C++"],
    experience: "Intermediate",
    date: "2026-04-07"
  }
];

export type Request = typeof REQUESTS[0];
