import { motion } from "framer-motion";
import { Users, Calendar, Inbox, BarChart3, TrendingUp, ArrowUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { StatCard } from "@/components/StatCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageTransition } from "@/components/PageTransition";
import { ADMIN_STATS, USERS } from "@/data/users";

const ACTIVITY_LOG = [
  { user: "Sam Smith", action: "submitted join request", time: "2 min ago" },
  { user: "Aisha Mohammed", action: "submitted join request", time: "15 min ago" },
  { user: "Carlos Mendez", action: "was approved as member", time: "1 hr ago" },
  { user: "Noah Williams", action: "was approved as member", time: "3 hr ago" },
  { user: "System", action: "React Workshop event updated", time: "5 hr ago" },
];

export default function AdminDashboard() {
  return (
    <PageTransition>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Dashboard" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={<Users className="w-5 h-5" />} label="Total Members" value={ADMIN_STATS.totalUsers} suffix="+" delay={0} />
              <StatCard icon={<Calendar className="w-5 h-5" />} label="Active Events" value={ADMIN_STATS.activeEvents} delay={0.1} color="text-secondary" />
              <StatCard icon={<Inbox className="w-5 h-5" />} label="Pending Requests" value={ADMIN_STATS.submissions} delay={0.2} color="text-chart-4" />
              <StatCard icon={<BarChart3 className="w-5 h-5" />} label="Categories" value={ADMIN_STATS.categories} delay={0.3} color="text-chart-3" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <ScrollReveal className="lg:col-span-2">
                <div className="bg-card border border-card-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Member Growth</h3>
                    <div className="flex items-center gap-1 text-xs text-chart-3 font-medium">
                      <ArrowUp className="w-3.5 h-3.5" />
                      +10.2% this month
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={ADMIN_STATS.growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                      <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-card border border-card-border rounded-xl p-5 h-full">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="flex flex-col gap-3">
                    {ACTIVITY_LOG.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs">
                            <span className="font-medium">{item.user}</span>{" "}
                            <span className="text-muted-foreground">{item.action}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="bg-card border border-card-border rounded-xl p-5">
                <h3 className="font-semibold mb-4">Top Members</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" data-testid="table-top-members">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Member</th>
                        <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Role</th>
                        <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Projects</th>
                        <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Streak</th>
                      </tr>
                    </thead>
                    <tbody>
                      {USERS.filter(u => u.role !== "admin").map((user, i) => (
                        <tr key={user.id} className="border-b border-border/50 last:border-0">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                {user.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <span className="font-medium text-xs">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="capitalize text-xs text-muted-foreground">{user.role}</span>
                          </td>
                          <td className="py-3 px-3 text-xs">{user.stats.projectsBuilt}</td>
                          <td className="py-3 px-3 text-xs">{user.stats.streakDays}d</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
