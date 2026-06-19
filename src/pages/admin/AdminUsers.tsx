import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, ShieldOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { USERS } from "@/data/users";

const ALL_USERS = [...USERS];

const STATUS_COLORS: Record<string, string> = {
  student: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  mentor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  admin: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [users, setUsers] = useState(ALL_USERS);

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || u.role === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Manage Users" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-testid="input-user-search"
                />
              </div>
              <div className="flex gap-2">
                {["All", "Student", "Mentor", "Admin"].map((f) => (
                  <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="text-xs">
                    {f}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-card-border rounded-xl overflow-hidden" data-testid="table-users">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">User</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium hidden sm:table-cell">Role</th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium hidden md:table-cell">Joined</th>
                    <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                      data-testid={`row-user-${user.id}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                            {user.name ? user.name.split(" ").map(n => n[0]).join("") : "?"}
                          </div>
                          <div>
                            <p className="font-medium text-xs">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full border capitalize font-medium ${STATUS_COLORS[user.role] || "text-muted-foreground bg-muted border-transparent"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-xs text-muted-foreground">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-muted-foreground hover:text-destructive" data-testid={`button-suspend-${user.id}`}>
                            <ShieldOff className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-muted-foreground hover:text-destructive" onClick={() => setUsers((prev) => prev.filter((u) => u.id !== user.id))} data-testid={`button-delete-user-${user.id}`}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-10 text-center text-sm text-muted-foreground">No users found</div>
              )}
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
