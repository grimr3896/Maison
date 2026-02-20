import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { CATALOG } from "@/lib/catalog";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_65%,#3a2a18_0%,#1a1a1a_60%)]" />
        <div className="bg-grain" />
        <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_60px,rgba(255,255,255,0.3)_60px,rgba(255,255,255,0.3)_61px)]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Kitchen · Furniture · Gaming
          </p>
          <h1 className="font-headline text-5xl md:text-8xl text-stone-100 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Your Home,<br />
            <em className="text-primary not-italic">Elevated.</em>
          </h1>
          <p className="text-stone-400 font-light max-w-lg mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            Premium appliances, thoughtful furniture, and cutting-edge gaming — curated for the way you actually live.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            {Object.entries(CATALOG).map(([key, cat]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="group p-6 min-w-[140px] border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl flex flex-col items-center gap-3 transition-all hover:bg-primary hover:border-primary"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-[0.65rem] tracking-widest uppercase text-white font-bold">{cat.id}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          <span className="text-[0.5rem] uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-[5%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div>
            <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary font-bold mb-3">Who We Are</p>
            <h2 className="font-headline text-4xl md:text-5xl leading-tight">Quality Products,<br />Personal Service</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed font-light">
            MAISON is a curated home and lifestyle store. We don't believe in impersonal checkouts — every order begins with a conversation.
          </p>
          <p className="text-muted-foreground leading-relaxed font-light">
            Browse our three collections, find what you love, and send a quick inquiry. Our team handles the rest, ensuring a seamless journey from our store to your home.
          </p>
          
          <div className="flex gap-12 pt-4">
            <div>
              <p className="font-headline text-4xl text-primary">3</p>
              <p className="text-[0.62rem] tracking-widest uppercase text-muted-foreground">Collections</p>
            </div>
            <div>
              <p className="font-headline text-4xl text-primary">50+</p>
              <p className="text-[0.62rem] tracking-widest uppercase text-muted-foreground">Products</p>
            </div>
            <div>
              <p className="font-headline text-4xl text-primary">24h</p>
              <p className="text-[0.62rem] tracking-widest uppercase text-muted-foreground">Response</p>
            </div>
          </div>
        </div>
        
        <div className="relative aspect-[4/3] bg-stone-200 rounded-3xl overflow-hidden flex items-center justify-center text-8xl shadow-2xl">
          <div className="bg-grain" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10" />
          🏡
        </div>
      </section>

      {/* Trust */}
      <section className="bg-stone-900 py-24 px-[5%] text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: "📦", title: "Arranged Delivery", text: "We coordinate delivery after your inquiry is confirmed" },
            { icon: "✦", title: "Quality Assured", text: "Every product sourced from trusted manufacturers" },
            { icon: "💬", title: "Real People", text: "A team member responds to every inquiry within 24 hours" },
            { icon: "🔁", title: "Easy Returns", text: "30-day hassle-free returns on all items" },
          ].map((item, i) => (
            <div key={i} className="space-y-3">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-headline text-lg text-stone-100">{item.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed font-light max-w-[200px] mx-auto">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <ChatAssistant />
    </div>
  );
}
