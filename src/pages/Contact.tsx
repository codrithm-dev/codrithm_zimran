import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageTransition } from "@/components/PageTransition";

export default function Contact() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl sm:text-5xl font-black mb-4">
                Contact <span className="text-gradient">Us</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Let's discuss how Codrithm can help bring your ideas to life.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <ContactForm />
        <Footer />
      </div>
    </PageTransition>
  );
}
