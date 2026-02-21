
"use client";

import { use, useState } from "react";
import Image from "next/image";
import { getProductById } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function InquiryPage({ params }: { params: Promise<{ categoryId: string, groupId: string, productId: string }> }) {
  const { productId, categoryId, groupId } = use(params);
  const result = getProductById(productId);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!result) return notFound();
  const { product } = result;

  const prodImage = PlaceHolderImages.find(img => img.id === product.image);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto pt-32 pb-20 px-[5%]">
        <div className="mb-12">
          <Link href={`/${categoryId}/${groupId}/${productId}`} className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" />
            Back to product
          </Link>
        </div>

        {!submitted ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-stone-900 p-8 rounded-[2rem] text-white shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 opacity-10">
                {prodImage && (
                  <Image 
                    src={prodImage.imageUrl} 
                    alt={prodImage.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={prodImage.imageHint}
                  />
                )}
              </div>
              <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative z-10 shrink-0">
                {prodImage && (
                  <Image 
                    src={prodImage.imageUrl} 
                    alt={prodImage.description} 
                    fill 
                    className="object-cover"
                    data-ai-hint={prodImage.imageHint}
                  />
                )}
              </div>
              <div className="space-y-1 relative z-10">
                <p className="text-[0.55rem] tracking-[0.2em] uppercase text-primary font-bold">Enquiring about</p>
                <h1 className="font-headline text-2xl lg:text-3xl">{product.name}</h1>
                <p className="text-stone-400 text-xs font-light tracking-wider uppercase">{product.model}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl md:text-4xl text-stone-900">Interested? Let&apos;s Talk.</h2>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Leave your details and we&apos;ll get back to you within 24 hours with everything you need to know about pricing, availability, and delivery.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-stone-500">Full Name</Label>
                    <Input required placeholder="Your full name" className="bg-white py-6 border-stone-200 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.6rem] uppercase tracking-widest text-stone-500">Phone Number</Label>
                    <Input required type="tel" placeholder="+254 700 000 000" className="bg-white py-6 border-stone-200 rounded-xl" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[0.6rem] uppercase tracking-widest text-stone-500">Email Address</Label>
                  <Input required type="email" placeholder="you@example.com" className="bg-white py-6 border-stone-200 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[0.6rem] uppercase tracking-widest text-stone-500">Your Message</Label>
                  <Textarea 
                    required 
                    className="bg-white min-h-[150px] border-stone-200 rounded-xl p-4"
                    defaultValue={`Hello, I'm interested in the ${product.name} and would like to know more about it.`}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-6 bg-primary text-white text-[0.7rem] uppercase tracking-[0.3em] font-bold rounded-xl hover:bg-stone-900 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Inquiry →"}
                </button>
                
                <p className="text-[0.6rem] text-center text-muted-foreground font-light px-8">
                  Your details are private and only used to respond to your specific inquiry. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 py-20 animate-in zoom-in-95 duration-700">
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-4">
              <h2 className="font-headline text-4xl text-stone-900">Inquiry Sent!</h2>
              <p className="text-muted-foreground font-light leading-relaxed max-w-sm mx-auto">
                Thank you! We&apos;ve received your inquiry and a team member will reach out via phone or email within 24 hours.
              </p>
            </div>
            <Link href="/" className="inline-block">
              <Button variant="outline" className="px-12 py-6 text-xs uppercase tracking-widest border-primary text-primary hover:bg-primary hover:text-white transition-all rounded-xl">
                Continue Browsing
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
}
