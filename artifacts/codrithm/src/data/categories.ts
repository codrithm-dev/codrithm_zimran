export const CATEGORIES = [
  {
    id: "web-dev",
    name: "Web Development",
    icon: "Globe",
    description: "Build modern web applications with React, Vue, Angular, Node.js, and more.",
    memberCount: 1240,
    difficulty: "Beginner",
    color: "#6366f1",
    accent: "from-indigo-500 to-purple-600",
    resources: ["React Official Docs", "MDN Web Docs", "CSS Tricks", "The Odin Project"],
    projects: ["Portfolio Site", "Task Tracker", "E-commerce Store", "Blog Platform"]
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: "Smartphone",
    description: "Create cross-platform apps for iOS and Android using React Native and Flutter.",
    memberCount: 890,
    difficulty: "Intermediate",
    color: "#8b5cf6",
    accent: "from-violet-500 to-purple-700",
    resources: ["React Native Docs", "Flutter Dev", "Expo Go", "Android Studio"],
    projects: ["Weather App", "Chat App", "Fitness Tracker", "Food Delivery"]
  },
  {
    id: "ai-ml",
    name: "AI / Machine Learning",
    icon: "Brain",
    description: "Explore machine learning, deep learning, and building intelligent systems.",
    memberCount: 1050,
    difficulty: "Advanced",
    color: "#06b6d4",
    accent: "from-cyan-500 to-blue-600",
    resources: ["Hugging Face", "fast.ai", "Kaggle", "Papers with Code"],
    projects: ["Sentiment Analyzer", "Image Classifier", "Chatbot", "Recommendation Engine"]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "Shield",
    description: "Learn ethical hacking, penetration testing, and securing digital systems.",
    memberCount: 620,
    difficulty: "Advanced",
    color: "#10b981",
    accent: "from-emerald-500 to-green-600",
    resources: ["TryHackMe", "HackTheBox", "OWASP", "Cybrary"],
    projects: ["Port Scanner", "Password Manager", "Vulnerability Checker", "CTF Writeups"]
  },
  {
    id: "game-dev",
    name: "Game Development",
    icon: "Gamepad2",
    description: "Build 2D and 3D games using Unity, Godot, and web technologies.",
    memberCount: 730,
    difficulty: "Intermediate",
    color: "#f59e0b",
    accent: "from-amber-500 to-orange-600",
    resources: ["Unity Docs", "Godot Engine", "Three.js", "GameDev.tv"],
    projects: ["Platformer Game", "Puzzle Game", "Multiplayer FPS", "Mobile Game"]
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    icon: "Cloud",
    description: "Master CI/CD pipelines, containerization, and cloud infrastructure.",
    memberCount: 550,
    difficulty: "Advanced",
    color: "#f97316",
    accent: "from-orange-500 to-red-600",
    resources: ["Docker Docs", "Kubernetes.io", "AWS Training", "GitHub Actions"],
    projects: ["CI/CD Pipeline", "Kubernetes Cluster", "Terraform Setup", "Monitoring Dashboard"]
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: "BarChart3",
    description: "Analyze data, build visualizations, and extract meaningful insights.",
    memberCount: 810,
    difficulty: "Intermediate",
    color: "#3b82f6",
    accent: "from-blue-500 to-indigo-600",
    resources: ["Pandas Docs", "Matplotlib", "Jupyter Notebooks", "Tableau"],
    projects: ["Data Dashboard", "EDA Project", "Predictive Model", "NLP Pipeline"]
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    icon: "Palette",
    description: "Design beautiful interfaces and intuitive user experiences with modern tools.",
    memberCount: 670,
    difficulty: "Beginner",
    color: "#ec4899",
    accent: "from-pink-500 to-rose-600",
    resources: ["Figma Learn", "Nielsen Norman Group", "Design Systems", "Dribbble"],
    projects: ["Design System", "App Redesign", "User Research", "Prototype"]
  },
  {
    id: "blockchain",
    name: "Blockchain / Web3",
    icon: "Link",
    description: "Build decentralized applications and smart contracts on Ethereum and beyond.",
    memberCount: 420,
    difficulty: "Advanced",
    color: "#a855f7",
    accent: "from-purple-500 to-violet-700",
    resources: ["Ethereum Docs", "Solidity Docs", "OpenZeppelin", "Alchemy"],
    projects: ["NFT Marketplace", "DeFi App", "Smart Contract", "DAO Platform"]
  },
  {
    id: "open-source",
    name: "Open Source",
    icon: "Code2",
    description: "Contribute to open source projects and learn collaborative development.",
    memberCount: 960,
    difficulty: "Beginner",
    color: "#84cc16",
    accent: "from-lime-500 to-green-500",
    resources: ["GitHub Docs", "Good First Issues", "Open Source Guide", "GSOC"],
    projects: ["First PR", "Bug Fix", "Feature Addition", "Documentation"]
  }
];

export type Category = typeof CATEGORIES[0];
