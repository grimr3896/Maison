"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { getProductById } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import emailjs from '@emailjs/browser';

export default function InquiryPage({ params }: { params: Promise<{ categoryId: string, groupId: string, productId: string }> }) {
  const { productId, categoryId, groupId } = use(params);
  const result = getProductById(productId);
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: result ? `Hello, I'm interested in the ${result.product.name} and would like to know more about it.` : ""
  });

  const [validationErrors, setValidationErrors] = useState({
    name: false,
    phone: false,
    email: false
  });

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "CVruh77CgutwA2-c9";
    emailjs.init(publicKey);
  }, []);

  if (!result) return notFound();
  const { product } = result;

  const prodImage = PlaceHolderImages.find(img => img.id === product.image);

  async function submitInq(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    const errors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      email: !formData.email.trim()
    };
    
    setValidationErrors(errors);
    
    if (errors.name || errors.phone || errors.email) {
      return;
    }

    setLoading(true);

    const productNameDisplay = document.getElementById('productNameDisplay')?.textContent || product.name;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      product_name: productNameDisplay,
      message: formData.message,
      reply_to: formData.email
    };

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_vela48m";
    const templateOwner = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OWNER || "template_n0a0boo";
    const templateCustomer = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CUSTOMER || "template_0rj81y8";

    try {
      await emailjs.send(serviceId, templateOwner, templateParams);
      await emailjs.send(serviceId, templateCustomer, templateParams);
      
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      const errorMessage = err?.text || err?.message || JSON.stringify(err);
      console.error("EmailJS Submission Error:", errorMessage);
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto pt-24 sm:pt-32 pb-16 sm:pb-20 px-[5%]">
        <div className="mb-8 sm:mb-12">
          <Link href={`/${categoryId}/${groupId}/${productId}`} className="inline-flex items-center gap-2 text-[0.6rem] xs:text-[0.65rem] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" />
            Back to product
          </Link>
        </div>

        {!submitted ? (
          <div className="space-y-10 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center bg-stone-900 p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] text-white shadow-xl overflow-hidden relative">
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
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden relative z-10 shrink-0">
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
                <p className="text-[0.55rem] xs:text-[0.55rem] tracking-[0.2em] uppercase text-primary font-bold">Enquiring about</p>
                <h1 id="productNameDisplay" className="font-headline text-xl sm:text-2xl lg:text-3xl">{product.name}</h1>
                <p className="text-stone-400 text-[0.6rem] sm:text-xs font-light tracking-wider uppercase">{product.model}</p>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-stone-900">Interested? Let&apos;s Talk.</h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                  Fill in your details below. Our team will get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={submitInq} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-stone-500">Full Name</Label>
                    <Input 
                      required 
                      placeholder="Your full name" 
                      className={cn(
                        "bg-white py-5 sm:py-6 border-stone-200 rounded-xl text-sm",
                        validationErrors.name && "border-red-500 ring-1 ring-red-500"
                      )}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-stone-500">Phone Number</Label>
                    <Input 
                      required 
                      type="tel" 
                      placeholder="+254 700 000 000" 
                      className={cn(
                        "bg-white py-5 sm:py-6 border-stone-200 rounded-xl text-sm",
                        validationErrors.phone && "border-red-500 ring-1 ring-red-500"
                      )}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-stone-500">Email Address</Label>
                  <Input 
                    required 
                    type="email" 
                    placeholder="you@example.com" 
                    className={cn(
                      "bg-white py-5 sm:py-6 border-stone-200 rounded-xl text-sm",
                      validationErrors.email && "border-red-500 ring-1 ring-red-500"
                    )}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-stone-500">Your Message</Label>
                  <Textarea 
                    required 
                    className="bg-white min-h-[120px] sm:min-h-[150px] border-stone-200 rounded-xl p-4 text-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button 
                  id="submitBtn"
                  type="submit" 
                  disabled={loading}
                  className={cn(
                    "w-full py-5 sm:py-6 bg-primary text-white text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.3em] font-bold rounded-xl hover:bg-stone-900 transition-all flex items-center justify-center gap-2",
                    loading && "loading opacity-80 cursor-not-allowed"
                  )}
                >
                  <div className="spinner"></div>
                  <span className="btn-text">Send Inquiry →</span>
                </button>
                
                <p id="formError" className={cn(
                  "text-red-500 text-[0.6rem] sm:text-[0.7rem] text-center font-bold",
                  !error && "hidden"
                )}>
                  {error}
                </p>
                
                <p className="text-[0.55rem] sm:text-[0.6rem] text-center text-muted-foreground font-light px-4 sm:px-8 leading-relaxed">
                  Your details are private and only used to respond to your specific inquiry. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6 sm:space-y-8 py-16 sm:py-20 animate-in zoom-in-95 duration-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="space-y-4">
              <h2 className="font-headline text-3xl sm:text-4xl text-stone-900">Inquiry Sent!</h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-sm mx-auto px-4">
                Thank you! We&apos;ve received your inquiry and our team will get back to you within 24 hours.
              </p>
            </div>
            <Link href="/" className="inline-block px-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 text-[0.6rem] sm:text-xs uppercase tracking-widest border border-primary text-primary hover:bg-primary hover:text-white transition-all rounded-xl">
                Continue Browsing
              </button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
}
