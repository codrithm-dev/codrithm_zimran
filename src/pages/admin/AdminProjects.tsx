import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Star, ExternalLink, Eye } from "lucide-react";
import { Github } from "@/components/icons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROJECTS } from "@/data/projects";

export default function AdminProjects() {
  const [projects, setProjects] = useState(
    PROJECTS.map((p) => ({ ...p, approved: p.status === "Active" || p.status === "Completed", name: p.name ?? p.title }))
  );
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, approved: true } : p)));
    toast.success("Project approved");
  };

  const handleReject = (id: string) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, approved: false } : p)));
    toast.success("Project rejected");
  };

  const handleToggleFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
    toast.success("Featured status updated");
  };

  const handleToggleStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextStatus = p.status === "Active" ? "Beta" : p.status === "Beta" ? "Completed" : "Active";
        return { ...p, status: nextStatus };
      })
    );
    toast.success("Status updated");
  };

  const STATUS_COLORS: Record<string, string> = {
    Active: "bg-emerald-400/10 text-emerald-400",
    Beta: "bg-amber-400/10 text-amber-400",
    Completed: "bg-blue-400/10 text-blue-400",
  };

  return (
    <PageTransition>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Project Management" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold">All Projects</h2>
                    <p className="text-sm text-muted-foreground">{projects.length} projects total</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400">
                      {projects.filter((p) => p.approved).length} Approved
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400">
                      {projects.filter((p) => !p.approved).length} Pending
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <div className="flex flex-col gap-4">
                {projects.map((project, i) => (
                  <ScrollReveal key={project.id} delay={i * 0.05}>
                    <motion.div
                      className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedProject === project.id
                          ? "border-primary shadow-lg"
                          : "border-card-border hover:border-primary/40"
                      }`}
                    >
                      <div
                        className="flex items-center gap-4 p-4 cursor-pointer"
                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                      >
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm truncate">{project.name}</h3>
                            {project.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                            {!project.approved && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400">Pending</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLORS[project.status]}`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-muted-foreground px-2">{project.category}</span>
                      </div>

                      <AnimatePresence>
                        {selectedProject === project.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-border"
                          >
                            <div className="p-4 space-y-4">
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies.map((tech) => (
                                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {!project.approved ? (
                                  <Button size="sm" onClick={() => handleApprove(project.id)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline" onClick={() => handleReject(project.id)}>
                                    <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleToggleFeatured(project.id)}
                                  className={project.featured ? "border-amber-400 text-amber-400" : ""}
                                >
                                  <Star className={`w-3.5 h-3.5 mr-1 ${project.featured ? "fill-amber-400" : ""}`} />
                                  {project.featured ? "Unfeature" : "Feature"}
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleToggleStatus(project.id)}>
                                  Status: {project.status}
                                </Button>
                                {project.github && (
                                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Button size="sm" variant="outline">
                                      <Github className="w-3.5 h-3.5 mr-1" /> Source
                                    </Button>
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
