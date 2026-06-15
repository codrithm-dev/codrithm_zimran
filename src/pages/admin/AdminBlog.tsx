import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, Edit3, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blogs";

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(2, "Author name is required"),
  tags: z.string().min(2, "Add at least one tag"),
  summary: z.string().min(20, "Summary must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
});

type BlogFormData = z.infer<typeof blogSchema>;

const EDIT_CATEGORIES = BLOG_CATEGORIES.filter((c) => c !== "All");

export default function AdminBlog() {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", category: "", author: "", tags: "", summary: "", content: "" },
  });

  const watched = form.watch();

  const onSubmit = (data: BlogFormData) => {
    console.log("Blog post created:", data);
    toast.success("Blog post published!", { description: `"${data.title}" is now live.` });
    form.reset();
    setShowPreview(false);
  };

  const handleDelete = (id: string) => {
    console.log("Delete blog post:", id);
    toast.success("Post deleted successfully");
    setSelectedPost(null);
  };

  return (
    <PageTransition>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Blog Management" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                <ScrollReveal>
                  <div className="bg-card border border-card-border rounded-xl p-6">
                    <h2 className="text-lg font-bold mb-4">Create New Post</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                      <div>
                        <Label htmlFor="blog-title">Title</Label>
                        <Input
                          id="blog-title"
                          className="mt-1"
                          placeholder="Blog post title"
                          {...form.register("title")}
                          aria-invalid={!!form.formState.errors.title}
                          aria-describedby={form.formState.errors.title ? "blog-title-error" : undefined}
                        />
                        {form.formState.errors.title && (
                          <p id="blog-title-error" className="text-destructive text-xs mt-1">{form.formState.errors.title.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="blog-category">Category</Label>
                          <select
                            id="blog-category"
                            className="mt-1 w-full h-10 px-3 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            {...form.register("category")}
                            aria-invalid={!!form.formState.errors.category}
                            aria-describedby={form.formState.errors.category ? "blog-category-error" : undefined}
                          >
                            <option value="">Select category</option>
                            {EDIT_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          {form.formState.errors.category && (
                            <p id="blog-category-error" className="text-destructive text-xs mt-1">{form.formState.errors.category.message}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="blog-author">Author</Label>
                          <Input
                            id="blog-author"
                            className="mt-1"
                            placeholder="Author name"
                            {...form.register("author")}
                            aria-invalid={!!form.formState.errors.author}
                            aria-describedby={form.formState.errors.author ? "blog-author-error" : undefined}
                          />
                          {form.formState.errors.author && (
                            <p id="blog-author-error" className="text-destructive text-xs mt-1">{form.formState.errors.author.message}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="blog-tags">Tags (comma-separated)</Label>
                        <Input
                          id="blog-tags"
                          className="mt-1"
                          placeholder="React, TypeScript, Web Dev"
                          {...form.register("tags")}
                          aria-invalid={!!form.formState.errors.tags}
                          aria-describedby={form.formState.errors.tags ? "blog-tags-error" : undefined}
                        />
                        {form.formState.errors.tags && (
                          <p id="blog-tags-error" className="text-destructive text-xs mt-1">{form.formState.errors.tags.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="blog-summary">Summary</Label>
                        <textarea
                          id="blog-summary"
                          className="mt-1 w-full min-h-[80px] px-3 py-2 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                          placeholder="Brief summary of the article..."
                          {...form.register("summary")}
                          aria-invalid={!!form.formState.errors.summary}
                          aria-describedby={form.formState.errors.summary ? "blog-summary-error" : undefined}
                        />
                        {form.formState.errors.summary && (
                          <p id="blog-summary-error" className="text-destructive text-xs mt-1">{form.formState.errors.summary.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="blog-content">Content</Label>
                        <textarea
                          id="blog-content"
                          className="mt-1 w-full min-h-[200px] px-3 py-2 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-mono"
                          placeholder="Write your blog post content here (Markdown supported)..."
                          {...form.register("content")}
                          aria-invalid={!!form.formState.errors.content}
                          aria-describedby={form.formState.errors.content ? "blog-content-error" : undefined}
                        />
                        {form.formState.errors.content && (
                          <p id="blog-content-error" className="text-destructive text-xs mt-1">{form.formState.errors.content.message}</p>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <Button type="button" variant="outline" onClick={() => setShowPreview(!showPreview)} className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          {showPreview ? "Hide Preview" : "Preview"}
                        </Button>
                        <Button type="submit" className="flex-1 glow-primary" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? "Publishing..." : "Publish Post"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </ScrollReveal>

                <div className="space-y-6">
                  <AnimatePresence>
                    {showPreview && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-card border border-card-border rounded-xl p-6"
                      >
                        <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Preview</h3>
                        <div className="border border-dashed border-border rounded-lg p-4">
                          {watched.category && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2 inline-block">
                              {watched.category}
                            </span>
                          )}
                          <h4 className="font-bold text-lg mb-2">{watched.title || "Untitled Post"}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{watched.summary || "No summary provided."}</p>
                          {watched.tags && (
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {watched.tags.split(",").map((tag, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                                  {tag.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                          {watched.content && (
                            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap border-t border-border pt-3 mt-3">
                              {watched.content}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                              {(watched.author || "A")[0]}
                            </div>
                            <span className="text-xs text-muted-foreground">{watched.author || "Unknown Author"}</span>
                            <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Just now
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-card border border-card-border rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Existing Posts</h3>
                    <div className="space-y-3">
                      {BLOG_POSTS.slice(0, 5).map((post) => (
                        <div
                          key={post.id}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                            selectedPost === post.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          }`}
                          onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{post.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">{post.category}</span>
                              <span className="text-[10px] text-muted-foreground">{post.author}</span>
                            </div>
                          </div>
                          {selectedPost === post.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex gap-1 ml-3"
                            >
                              <button className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(post.id); }}
                                className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
