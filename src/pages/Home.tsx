import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TechStack } from "@/components/sections/TechStack";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageTransition } from "@/components/PageTransition";
import { MagneticButton } from "@/components/MagneticButton";
import { GradientPulse } from "@/components/GradientPulse";
import { PRODUCTS } from "@/data/products";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <ServiceGrid />
        <TechStack />

        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Our Products</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Tools and platforms built to empower the next generation of developers.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PRODUCTS.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.1}>
                  <div className="bg-card border border-card-border rounded-xl p-6 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold">{product.name}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          product.status === "live"
                            ? "bg-green-500/10 text-green-500"
                            : product.status === "beta"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {product.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((f) => (
                        <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-primary/50" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-8">
              <MagneticButton pullDistance={10}>
                <Link href="/products">
                  <Button variant="outline">
                    View All Products <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <GradientPulse>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-12">
                  <h2 className="text-4xl font-black mb-4">
                    Ready to <span className="text-gradient">build something?</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Whether you need a software partner or want to join our learning community.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <MagneticButton pullDistance={12}>
                      <Link href="/contact">
                        <Button size="lg" className="glow-primary text-base px-8 cursor-pointer">
                          Start a Project <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </MagneticButton>
                    <MagneticButton pullDistance={12}>
                      <Link href="/about">
                        <Button size="lg" variant="outline" className="text-base px-8 cursor-pointer">
                          Learn About Us
                        </Button>
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </GradientPulse>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
