export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  slug: string;
}

export const BLOGS: BlogPost[] = [];

// Used by AdminBlog
export const BLOG_POSTS: BlogPost[] = [];

export const BLOG_CATEGORIES: string[] = ["All", "Engineering", "AI & ML", "DevOps", "Design", "Cloud"];
