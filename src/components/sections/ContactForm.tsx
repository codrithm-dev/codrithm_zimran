import { useState, useRef } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP } from "@/lib/gsap";
import { GsapTextReveal } from "@/components/gsap/GsapTextReveal";
import { useTheme } from "@/components/theme-provider";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const cardBg = isDark ? '#0D1B2A' : '#EEF4FF';
  const cardBgHover = isDark ? '#112240' : '#DCE8FF';
  const cardBorder = isDark ? '1px solid rgba(43,100,217,0.2)' : '1px solid rgba(43,100,217,0.3)';
  const cardBorderHover = isDark ? '1px solid rgba(43,100,217,0.6)' : '1px solid rgba(43,100,217,0.7)';
  const cardText = isDark ? '#FFFFFF' : '#1a2a4a';

  useGSAP(
    () => {
      if (leftRef.current) {
        gsap.from(leftRef.current, {
          opacity: 0,
          x: -40,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      if (rightRef.current) {
        gsap.from(rightRef.current, {
          opacity: 0,
          x: 40,
          duration: 0.6,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        const fields = rightRef.current.querySelectorAll(".form-field");
        gsap.from(fields, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={leftRef}>
            <GsapTextReveal as="h2" className="text-3xl font-bold mb-3">
              Get in Touch
            </GsapTextReveal>
            <p className="text-muted-foreground mb-8">
              Have a project in mind or want to learn more about our services? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@codrithm.com" },
                { icon: Phone, label: "Phone", value: "+92 300 1234567" },
                { icon: MapPin, label: "Office", value: "Karachi, Pakistan" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                    key={label}
                    className="flex items-start gap-4 rounded-xl p-4"
                    style={{ background: cardBg, border: cardBorder, transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBgHover; (e.currentTarget as HTMLDivElement).style.border = cardBorderHover; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = cardBg; (e.currentTarget as HTMLDivElement).style.border = cardBorder; }}
                  >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ background: "linear-gradient(to right, #8BECAE, #2B64D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{label}</div>
                    <div className="text-sm" style={{ color: cardText }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef}>
            <form onSubmit={handleSubmit} className="rounded-xl p-6 space-y-4" style={{ background: cardBg, border: cardBorder }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="text-sm font-medium mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Project inquiry"
                  required
                />
              </div>
              <div className="form-field">
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <div className="form-field">
                <Button type="submit" className="w-full glow-primary cursor-pointer" disabled={submitted}>
                  {submitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
