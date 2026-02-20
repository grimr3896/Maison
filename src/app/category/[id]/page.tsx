import { notFound } from "next/navigation";
import { CATALOG } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const category = CATALOG[id as keyof typeof CATALOG];

  if (!category) return notFound();

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Category Hero */}
      <section className={`relative pt-40 pb-24 px-[5%] overflow-hidden ${category.theme} text-stone-900`}>
        <div className="bg-grain" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-10">
          <nav className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-stone-900/40">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-stone-900/80 font-bold">{category.label}</span>
          </nav>
          
          <div className="space-y-6">
            <span className="text-6xl block transform hover:scale-110 transition-transform cursor-default w-fit">{category.emoji}</span>
            <div className="space-y-3">
              <p className="text-[0.65rem] tracking-[0.4em] uppercase text-primary font-bold">{category.label}</p>
              <h1 className="font-headline text-5xl md:text-8xl leading-[1.1] whitespace-pre-line tracking-tight">
                {category.title}
              </h1>
            </div>
            <p className="text-stone-600 font-light max-w-xl text-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              {category.sub}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-4">
            {Object.values(category.groups).map((group) => (
              <a
                key={group.name}
                href={`#${group.name.toLowerCase()}`}
                className="px-8 py-3 border border-stone-900/10 bg-white/40 backdrop-blur-md rounded-full text-[0.62rem] tracking-[0.2em] uppercase font-bold hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-sm"
              >
                {group.emoji} {group.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-24 px-[5%] space-y-16">
        <div className="max-w-xl space-y-4">
          <p className="text-[0.62rem] tracking-[0.2em] uppercase text-primary font-bold">Browse by Group</p>
          <h2 className="font-headline text-4xl md:text-5xl">Curated Collections</h2>
          <p className="text-muted-foreground font-light text-base leading-relaxed">
            Explore our thoughtfully organized groups. Every item is selected for its balance of beauty and utility.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full border-t border-stone-200">
          {Object.entries(category.groups).map(([gk, group]) => (
            <AccordionItem value={gk} key={gk} id={group.name.toLowerCase()} className="border-b border-stone-200">
              <AccordionTrigger className="hover:no-underline group py-10 px-4">
                <div className="flex items-center gap-8 text-left">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-stone-100 flex items-center justify-center text-4xl group-hover:bg-stone-200 group-hover:shadow-inner transition-all duration-500">
                    {group.emoji}
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.15em] uppercase text-primary font-bold mb-2">{group.label}</p>
                    <p className="font-headline text-3xl text-stone-900">{group.name}</p>
                  </div>
                </div>
                <div className="hidden sm:block text-[0.68rem] tracking-widest uppercase text-muted-foreground/60 pr-12 font-medium">
                  {group.products.length} {group.products.length === 1 ? 'Item' : 'Items'}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-16 pt-8 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                  {group.products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group space-y-5">
                      <div className="relative aspect-square bg-stone-100 rounded-[2rem] flex items-center justify-center text-6xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 overflow-hidden border border-transparent group-hover:border-stone-200">
                        <div className="bg-grain opacity-[0.03]" />
                        {product.badge && (
                          <div className="absolute top-5 left-5 px-4 py-1.5 bg-primary text-white text-[0.55rem] uppercase tracking-widest font-black z-10 shadow-lg">
                            {product.badge}
                          </div>
                        )}
                        <span className="group-hover:scale-110 transition-transform duration-700">{product.emoji}</span>
                      </div>
                      <div className="space-y-2 px-2">
                        <p className="text-[0.55rem] tracking-widest uppercase text-primary font-bold">{group.name}</p>
                        <h3 className="font-headline text-xl text-stone-900 group-hover:text-primary transition-colors leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-light tracking-wide">{product.model}</p>
                        <div className="pt-3 text-[0.62rem] uppercase tracking-widest text-primary font-bold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                          View Details →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Footer />
      <ChatAssistant />
    </div>
  );
}
