import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ParallaxBackground } from "@/components/ParallaxBackground";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactData = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@codrithm.com" },
  { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "San Francisco, CA" },
];

const SOCIALS = [
  { icon: <Github className="w-4 h-4" />, href: "https://github.com/codrithm", label: "GitHub" },
  { icon: <Twitter className="w-4 h-4" />, href: "https://twitter.com/codrithm", label: "Twitter" },
  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/company/codrithm", label: "LinkedIn" },
];

export default function Contact() {
  const form = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: ContactData) => {
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <ParallaxBackground count={3} showParticles={true} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-black mb-3">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Have a question, want to collaborate, or just say hello? We'd love to hear from you.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <ParallaxBackground count={2} showParticles={false} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12">
              <ParallaxSection speed={0.15}>
                <ScrollReveal>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-name">Your Name</Label>
                        <Input
                          id="contact-name"
                          className="mt-1"
                          placeholder="Alex Rivera"
                          {...form.register("name")}
                          aria-invalid={!!form.formState.errors.name}
                          aria-describedby={form.formState.errors.name ? "contact-name-error" : undefined}
                        />
                        {form.formState.errors.name && (
                          <p id="contact-name-error" className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Email Address</Label>
                        <Input
                          id="contact-email"
                          className="mt-1"
                          type="email"
                          placeholder="alex@example.com"
                          {...form.register("email")}
                          aria-invalid={!!form.formState.errors.email}
                          aria-describedby={form.formState.errors.email ? "contact-email-error" : undefined}
                        />
                        {form.formState.errors.email && (
                          <p id="contact-email-error" className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input
                        id="contact-subject"
                        className="mt-1"
                        placeholder="How can we help?"
                        {...form.register("subject")}
                        aria-invalid={!!form.formState.errors.subject}
                        aria-describedby={form.formState.errors.subject ? "contact-subject-error" : undefined}
                      />
                      {form.formState.errors.subject && (
                        <p id="contact-subject-error" className="text-destructive text-xs mt-1">{form.formState.errors.subject.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <textarea
                        id="contact-message"
                        className="mt-1 w-full min-h-[140px] px-3 py-2 rounded-xl bg-background border border-input text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        placeholder="Tell us about your project, question, or idea..."
                        {...form.register("message")}
                        aria-invalid={!!form.formState.errors.message}
                        aria-describedby={form.formState.errors.message ? "contact-message-error" : undefined}
                      />
                      {form.formState.errors.message && (
                        <p id="contact-message-error" className="text-destructive text-xs mt-1">{form.formState.errors.message.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full glow-primary" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </ScrollReveal>
              </ParallaxSection>

              <ParallaxSection speed={-0.1}>
                <ScrollReveal delay={0.2}>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      {CONTACT_INFO.map((info) => (
                        <div key={info.label} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            {info.icon}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">{info.label}</p>
                            <p className="text-sm font-medium">{info.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-semibold mb-3">Follow Us</h3>
                      <div className="flex gap-3">
                        {SOCIALS.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card border border-card-border rounded-xl p-6 mt-6">
                      <h3 className="font-bold mb-2">Office Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                        Saturday: 10:00 AM - 2:00 PM (PST)<br />
                        Sunday: Closed
                      </p>
                    </div>

                    <div className="bg-card border border-card-border rounded-xl overflow-hidden">
                      <div className="h-48 bg-muted/50 flex items-center justify-center text-muted-foreground text-sm">
                        <div className="text-center">
                          <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>San Francisco, CA</p>
                          <p className="text-xs mt-1">Interactive map coming soon</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </ParallaxSection>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
