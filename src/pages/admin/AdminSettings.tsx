import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Globe, Lock, Mail, Zap, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { PageTransition } from "@/components/PageTransition";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [maintenance, setMaintenance] = useState(false);
  const [registrations, setRegistrations] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [platformName, setPlatformName] = useState("Codrithm");
  const [supportEmail, setSupportEmail] = useState("support@codrithm.dev");

  return (
    <PageTransition>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopBar title="Settings" />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-card-border rounded-xl p-6"
              >
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" /> Platform Settings
                </h3>
                <p className="text-xs text-muted-foreground mb-4">General platform configuration</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label className="text-sm">Platform Name</Label>
                    <Input value={platformName} onChange={(e) => setPlatformName(e.target.value)} className="mt-1" data-testid="input-platform-name" />
                  </div>
                  <div>
                    <Label className="text-sm">Support Email</Label>
                    <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="mt-1" data-testid="input-support-email" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-card-border rounded-xl p-6"
              >
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" /> Feature Flags
                </h3>
                <p className="text-xs text-muted-foreground mb-4">Toggle platform features on or off</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Open Registrations", desc: "Allow new members to apply", value: registrations, setter: setRegistrations, id: "toggle-registrations" },
                    { label: "Auto-approve Requests", desc: "Automatically approve new join requests", value: autoApprove, setter: setAutoApprove, id: "toggle-auto-approve" },
                    { label: "Maintenance Mode", desc: "Show maintenance page to all visitors", value: maintenance, setter: setMaintenance, id: "toggle-maintenance" },
                  ].map((s) => (
                    <div key={s.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                      <Switch checked={s.value} onCheckedChange={s.setter} data-testid={s.id} />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-card-border rounded-xl p-6"
              >
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-chart-4" /> Notification Settings
                </h3>
                <p className="text-xs text-muted-foreground mb-4">Configure admin alerts and notifications</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Email notifications", desc: "Get emailed on new join requests", value: emailNotif, setter: setEmailNotif, id: "toggle-admin-email" },
                  ].map((s) => (
                    <div key={s.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                      <Switch checked={s.value} onCheckedChange={s.setter} data-testid={s.id} />
                    </div>
                  ))}
                </div>
              </motion.div>

              <Button
                className="glow-primary"
                onClick={() => toast({ title: "Settings saved!", description: "Your changes have been applied." })}
                data-testid="button-save-settings"
              >
                <Save className="w-4 h-4 mr-2" /> Save All Settings
              </Button>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
}
