"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'about-maison');
  const philosophyImage = PlaceHolderImages.find(img => img.id === 'about-philosophy');
  const teamImage = PlaceHolderImages.find(img => img.id === 'about-team');

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="bg-grain" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-40 grayscale"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-10 text-center px-[5%] max-w-4xl mx-auto space-y-6">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Our Story
          </p>
          <h1 className="font-headline text-5xl md:text-8xl text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            The Art of<br />
            <em className="text-primary not-italic">Better Living.</em>
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-[5%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary font-bold">Philosophy</p>
            <h2 className="font-headline text-4xl md:text-5xl">Curation Over Consumption.</h2>
          </div>
          <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg">
            <p>
              Founded in Brisbane, MAISON was born from a simple observation: the world doesn't need more products; it needs better ones.
            </p>
            <p>
              We are a team of curators, designers, and home enthusiasts dedicated to sourcing pieces that bridge the gap between functional utility and aesthetic beauty.
            </p>
            <p>
              Every item in our collection is hand-selected based on three principles: timeless design, exceptional build quality, and the ability to elevate the everyday.
            </p>
          </div>
        </div>
        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
          <div className="bg-grain z-10" />
          {philosophyImage && (
            <Image
              src={philosophyImage.imageUrl}
              alt={philosophyImage.description}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              data-ai-hint={philosophyImage.imageHint}
            />
          )}
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-stone-900 py-32 px-[5%] text-white overflow-hidden relative">
        <div className="bg-grain opacity-5" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="order-2 lg:order-1 relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
             {teamImage && (
              <Image
                src={teamImage.imageUrl}
                alt={teamImage.description}
                fill
                className="object-cover"
                data-ai-hint={teamImage.imageHint}
              />
            )}
          </div>
          <div className="order-1 lg:order-2 space-y-12">
            <div className="space-y-4">
              <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary font-bold">The Process</p>
              <h2 className="font-headline text-4xl md:text-5xl">A Human Experience.</h2>
              <p className="text-stone-400 font-light leading-relaxed text-lg">
                We've moved away from the cold, impersonal automated checkout. At MAISON, every purchase begins with an inquiry and a conversation with a real person.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                { n: "01", t: "Inquiry", d: "Find something you love and send us a quick note. No payment required." },
                { n: "02", t: "Consultation", d: "A team member responds within 24 hours to discuss delivery, setup, and questions." },
                { n: "03", t: "Delivery", d: "Once confirmed, we coordinate white-glove delivery directly to your door." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 border-l border-white/10 pl-8 relative">
                  <div className="absolute left-[-1px] top-0 h-8 w-px bg-primary" />
                  <span className="font-headline text-2xl text-primary/40">{step.n}</span>
                  <div className="space-y-1">
                    <h3 className="font-headline text-xl text-white">{step.t}</h3>
                    <p className="text-stone-500 text-sm font-light leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 px-[5%] text-center max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary font-bold">Visit Us</p>
          <h2 className="font-headline text-4xl md:text-5xl text-stone-900">Brisbane CBD, Australia</h2>
          <p className="text-muted-foreground font-light text-lg">
            Our flagship showroom is located in the heart of Brisbane, where you can experience our collections in person.
          </p>
        </div>
        <div className="pt-8">
          <Link href="/#collections" className="inline-flex items-center gap-4 group">
            <span className="text-[0.65rem] tracking-[0.3em] uppercase font-bold text-stone-900 group-hover:text-primary transition-colors">
              Browse Collections
            </span>
            <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
      <ChatAssistant />
    </div>
  );
}