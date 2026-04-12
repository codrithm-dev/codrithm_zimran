import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ADMIN_STATS } from "@/data/users";

const CHART_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const tooltipStyle = {
  contentStyle: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    fontSize: 12,
  },
};

export default function AdminAnalytics() {
  return (
    <PageTransition>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Reports & Analytics" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <ScrollReveal>
                <div className="bg-card border border-card-border rounded-xl p-5">
                  <h3 className="font-semibold mb-1">Member Growth</h3>
                  <p className="text-xs text-muted-foreground mb-4">New members over 6 months</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={ADMIN_STATS.growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip {...tooltipStyle} />
                      <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-card border border-card-border rounded-xl p-5">
                  <h3 className="font-semibold mb-1">Members by Category</h3>
                  <p className="text-xs text-muted-foreground mb-4">Top 6 most active communities</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={ADMIN_STATS.categoryBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip {...tooltipStyle} />
                      <Bar dataKey="members" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-card-border rounded-xl p-5">
                  <h3 className="font-semibold mb-1">Skill Distribution</h3>
                  <p className="text-xs text-muted-foreground mb-4">Most common languages among members</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={ADMIN_STATS.skillDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {ADMIN_STATS.skillDistribution.map((_, index) => (
                          <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip {...tooltipStyle} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-card border border-card-border rounded-xl p-5">
                  <h3 className="font-semibold mb-4">Key Metrics</h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Avg. daily signups", value: "18", trend: "+3 vs last week" },
                      { label: "Event attendance rate", value: "72%", trend: "+5% vs last month" },
                      { label: "Avg. projects per member", value: "2.7", trend: "+0.4 vs last quarter" },
                      { label: "Community retention rate", value: "84%", trend: "Steady" },
                      { label: "Request approval rate", value: "68%", trend: "-2% vs last month" },
                    ].map((metric, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <span className="text-sm text-muted-foreground">{metric.label}</span>
                        <div className="text-right">
                          <span className="text-sm font-semibold">{metric.value}</span>
                          <p className="text-xs text-muted-foreground">{metric.trend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
