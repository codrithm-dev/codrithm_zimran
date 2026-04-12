import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { REQUESTS } from "@/data/requests";
import type { Request } from "@/data/requests";

const STATUS_STYLES: Record<string, string> = {
  Pending: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  Approved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  Rejected: "text-rose-400 bg-rose-400/10 border-rose-400/30",
};

export default function AdminRequests() {
  const [requests, setRequests] = useState<Request[]>(REQUESTS);
  const [filter, setFilter] = useState("All");

  const updateStatus = (id: string, status: "Approved" | "Rejected") => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
  };

  const filtered = filter === "All" ? requests : requests.filter((r) => r.status === filter);

  return (
    <PageTransition>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Requests Management" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center gap-2 mb-6">
              {["All", "Pending", "Approved", "Rejected"].map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  data-testid={`button-filter-requests-${f.toLowerCase()}`}
                  className="text-xs"
                >
                  {f}
                  <span className="ml-1.5 text-xs opacity-60">
                    {f === "All" ? requests.length : requests.filter((r) => r.status === f).length}
                  </span>
                </Button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((req, i) => (
                  <motion.div
                    key={req.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-card-border rounded-xl p-5"
                    data-testid={`card-request-${req.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                          {req.name.split(" ").map((n: string) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{req.name}</p>
                          <p className="text-xs text-muted-foreground">{req.email}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLES[req.status]}`}>
                        {req.status}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 italic">"{req.message}"</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="text-xs text-muted-foreground mr-1">Skills:</span>
                      {(req.skills as string[]).slice(0, 3).map((s: string) => (
                        <span key={s} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{req.date}</span>
                      {req.status === "Pending" && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(req.id, "Rejected")}
                            data-testid={`button-reject-${req.id}`}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateStatus(req.id, "Approved")}
                            data-testid={`button-approve-${req.id}`}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p>No {filter.toLowerCase()} requests</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
