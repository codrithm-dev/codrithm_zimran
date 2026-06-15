import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, CheckCircle2, AlertCircle, Trash2, Archive } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";

const INQUIRIES = [
  {
    id: "inq1",
    name: "Emily Rodriguez",
    email: "emily@university.edu",
    subject: "Partnership Inquiry",
    message: "Hi Codrithm team! I'm from the CS department at Stanford University and we'd love to explore a partnership for our upcoming hackathon. We think your community platform would be a perfect fit for our 500+ students.",
    date: "2026-06-10",
    status: "New",
    type: "Partnership",
  },
  {
    id: "inq2",
    name: "David Kim",
    email: "david.kim@techcorp.com",
    subject: "Enterprise Plan Pricing",
    message: "We're a mid-size tech company looking to sponsor learning initiatives for our junior engineers. Could you provide information about enterprise plans and bulk licensing?",
    date: "2026-06-09",
    status: "New",
    type: "Sales",
  },
  {
    id: "inq3",
    name: "Fatima Al-Hassan",
    email: "fatima@startup.io",
    subject: "Speaking Opportunity",
    message: "I'd love to speak at your next community event about my experience transitioning from academia to a startup CTO role. I've mentored 50+ students and would love to share insights.",
    date: "2026-06-08",
    status: "Replied",
    type: "General",
  },
  {
    id: "inq4",
    name: "James Wilson",
    email: "james.w@devagency.com",
    subject: "Freelance Collaboration",
    message: "I run a small dev agency and we're looking for talented students to collaborate on a client project. Would Codrithm be interested in connecting us with potential collaborators?",
    date: "2026-06-07",
    status: "Replied",
    type: "Partnership",
  },
  {
    id: "inq5",
    name: "Sofia Martinez",
    email: "sofia.m@student.org",
    subject: "Bug Report",
    message: "Found a bug in the learning platform - the progress tracker doesn't update when I complete a lesson. Using Chrome on macOS. Can you look into this?",
    date: "2026-06-06",
    status: "Resolved",
    type: "Support",
  },
  {
    id: "inq6",
    name: "Amit Patel",
    email: "amit@research.edu",
    subject: "Research Collaboration",
    message: "We're conducting a study on online learning communities and would love to include Codrithm as a case study. Interested in collaborating on this academic research?",
    date: "2026-06-05",
    status: "Archived",
    type: "General",
  },
];

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode }> = {
  New: { color: "bg-blue-400/10 text-blue-400", icon: <AlertCircle className="w-3 h-3" /> },
  Replied: { color: "bg-amber-400/10 text-amber-400", icon: <Mail className="w-3 h-3" /> },
  Resolved: { color: "bg-emerald-400/10 text-emerald-400", icon: <CheckCircle2 className="w-3 h-3" /> },
  Archived: { color: "bg-muted/50 text-muted-foreground", icon: <Archive className="w-3 h-3" /> },
};

const TYPE_COLORS: Record<string, string> = {
  Partnership: "bg-purple-400/10 text-purple-400",
  Sales: "bg-emerald-400/10 text-emerald-400",
  General: "bg-blue-400/10 text-blue-400",
  Support: "bg-amber-400/10 text-amber-400",
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState(INQUIRIES);
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = inquiries.filter(
    (inq) => filterStatus === "All" || inq.status === filterStatus
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));
    toast.success(`Inquiry marked as ${newStatus}`);
  };

  const handleArchive = (id: string) => {
    handleStatusChange(id, "Archived");
  };

  return (
    <PageTransition>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Inquiries" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold">Inquiries</h2>
                    <p className="text-sm text-muted-foreground">
                      {inquiries.filter((i) => i.status === "New").length} unread messages
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(filterStatus === status ? "All" : status)}
                        className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                          filterStatus === status
                            ? `${config.color} ring-1 ring-current`
                            : "bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <div className="flex flex-col gap-3">
                {filtered.map((inquiry, i) => (
                  <ScrollReveal key={inquiry.id} delay={i * 0.03}>
                    <motion.div
                      className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedInquiry === inquiry.id
                          ? "border-primary shadow-lg"
                          : "border-card-border hover:border-primary/40"
                      }`}
                    >
                      <div
                        className="flex items-center gap-4 p-4 cursor-pointer"
                        onClick={() => setSelectedInquiry(selectedInquiry === inquiry.id ? null : inquiry.id)}
                      >
                        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                          {inquiry.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm">{inquiry.name}</h3>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${TYPE_COLORS[inquiry.type]}`}>
                              {inquiry.type}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{inquiry.subject}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${STATUS_CONFIG[inquiry.status].color}`}>
                            {STATUS_CONFIG[inquiry.status].icon}
                            {inquiry.status}
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:block">{inquiry.date}</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedInquiry === inquiry.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-border"
                          >
                            <div className="p-4 space-y-4">
                              <div className="bg-muted/30 rounded-lg p-4">
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                  {inquiry.message}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="w-3.5 h-3.5" />
                                <span>{inquiry.email}</span>
                                <span className="mx-1">·</span>
                                <Clock className="w-3.5 h-3.5" />
                                <span>{inquiry.date}</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {inquiry.status === "New" && (
                                  <Button size="sm" onClick={() => handleStatusChange(inquiry.id, "Replied")}>
                                    <Mail className="w-3.5 h-3.5 mr-1" /> Mark as Replied
                                  </Button>
                                )}
                                {inquiry.status === "Replied" && (
                                  <Button size="sm" onClick={() => handleStatusChange(inquiry.id, "Resolved")}>
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark as Resolved
                                  </Button>
                                )}
                                {inquiry.status !== "Archived" && (
                                  <Button size="sm" variant="outline" onClick={() => handleArchive(inquiry.id)}>
                                    <Archive className="w-3.5 h-3.5 mr-1" /> Archive
                                  </Button>
                                )}
                                <a href={`mailto:${inquiry.email}`}>
                                  <Button size="sm" variant="outline">
                                    <Mail className="w-3.5 h-3.5 mr-1" /> Reply via Email
                                  </Button>
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-lg font-medium">No inquiries found</p>
                  <p className="text-sm mt-1">Try a different filter</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
