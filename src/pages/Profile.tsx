import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Moon, Mail, Edit3, Star, Calendar, Code2, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { ParallaxSection } from "@/components/ParallaxSection";
import { CURRENT_USER } from "@/data/users";

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const user = CURRENT_USER;

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <ParallaxBackground count={3} showParticles={true} />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-card-border rounded-2xl p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                    {user.name ? user.name.split(" ").map((n) => n[0]).join("") : "?"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-bold" data-testid="text-profile-name">{user.name}</h1>
                      <p className="text-muted-foreground text-sm">{user.email}</p>
                      <p className="text-muted-foreground text-sm capitalize">{user.role}</p>
                    </div>
                    <Button variant="outline" size="sm" className="self-start" data-testid="button-edit-profile">
                      <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 max-w-lg">{user.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Code2, label: "Projects", value: user.stats.projectsBuilt, color: "text-primary" },
                { icon: Calendar, label: "Events", value: user.stats.eventsAttended, color: "text-secondary" },
                { icon: Flame, label: "Streak", value: user.stats.streakDays, suffix: "d", color: "text-chart-4" },
                { icon: Star, label: "Contributions", value: user.stats.contributions, color: "text-chart-3" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-card border border-card-border rounded-xl p-4 text-center"
                  data-testid={`stat-profile-${s.label.toLowerCase()}`}
                >
                  <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
                  <div className={`text-2xl font-bold font-mono ${s.color}`}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ParallaxSection speed={0.15}>
              <ScrollReveal>
                <div className="bg-card border border-card-border rounded-xl p-6">
                  <h2 className="font-semibold mb-4">Badges & Achievements</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.stats.badges.map((badge) => (
                      <motion.div
                        key={badge}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-xs font-medium text-primary cursor-default"
                      >
                        {badge}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              </ParallaxSection>

              <ParallaxSection speed={-0.1}>
              <ScrollReveal delay={0.1}>
                <div className="bg-card border border-card-border rounded-xl p-6">
                  <h2 className="font-semibold mb-4">Recent Activity</h2>
                  <div className="flex flex-col gap-3">
                    {user.activity.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm">{item.message}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              </ParallaxSection>

              <ParallaxSection speed={0.2} className="md:col-span-2">
                <ScrollReveal delay={0.2}>
                  <div className="bg-card border border-card-border rounded-xl p-6">
                    <h2 className="font-semibold mb-1 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-primary" /> Settings
                    </h2>
                    <p className="text-sm text-muted-foreground mb-5">Manage your account preferences</p>
                    <div className="flex flex-col gap-4">
                      {[
                        { icon: Bell, label: "Push Notifications", desc: "Get notified about events and messages", value: notifications, setter: setNotifications, id: "toggle-notifications" },
                        { icon: Mail, label: "Email Updates", desc: "Weekly digest and announcements", value: emailUpdates, setter: setEmailUpdates, id: "toggle-email" },
                        { icon: Moon, label: "Public Profile", desc: "Allow others to find your profile", value: publicProfile, setter: setPublicProfile, id: "toggle-public" },
                      ].map((s) => (
                        <div key={s.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <s.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{s.label}</p>
                              <p className="text-xs text-muted-foreground">{s.desc}</p>
                            </div>
                          </div>
                          <Switch
                            checked={s.value}
                            onCheckedChange={s.setter}
                            data-testid={s.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </ParallaxSection>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
