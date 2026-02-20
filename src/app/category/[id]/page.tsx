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
      <section className={`relative pt-32 pb-20 px-[5%] overflow-hidden ${category.theme} text-white`}>
        <div className="bg-grain" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-8">
          <nav className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-white/50">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-white/80">{category.label}</span>
          </nav>
          
          <div className="space-y-4">
            <span className="text-6xl block">{category.emoji}</span>
            <p className="text-[0.62rem] tracking-[0.3em] uppercase text-primary font-bold">{category.label}</p>
            <h1 className="font-headline text-5xl md:text-7xl leading-tight whitespace-pre-line">
              {category.title}
            </h1>
            <p className="text-white/60 font-light max-w-xl leading-relaxed">
              {category.sub}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {Object.values(category.groups).map((group) => (
              <a
                key={group.name}
                href={`#${group.name.toLowerCase()}`}
                className="px-6 py-2 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full text-[0.62rem] tracking-widest uppercase hover:bg-primary transition-colors"
              >
                {group.emoji} {group.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-20 px-[5%] space-y-12">
        <div className="max-w-xl space-y-4">
          <p className="text-[0.62rem] tracking-[0.2em] uppercase text-primary font-bold">Browse by Group</p>
          <h2 className="font-headline text-3xl md:text-4xl">Curated Collections</h2>
          <p className="text-muted-foreground font-light text-sm leading-relaxed">
            Explore our thoughtfully organized groups. Every item is selected for its balance of beauty and utility.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full border-t border-stone-200">
          {Object.entries(category.groups).map(([gk, group]) => (
            <AccordionItem value={gk} key={gk} id={group.name.toLowerCase()} className="border-b border-stone-200">
              <AccordionTrigger className="hover:no-underline group py-8">
                <div className="flex items-center gap-6 text-left">
                  <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-3xl group-hover:bg-stone-200 transition-colors">
                    {group.emoji}
                  </div>
                  <div>
                    <p className="text-[0.55rem] tracking-[0.15em] uppercase text-primary font-bold mb-1">{group.label}</p>
                    <p className="font-headline text-2xl text-stone-900">{group.name}</p>
                  </div>
                </div>
                <div className="hidden sm:block text-[0.65rem] tracking-widest uppercase text-muted-foreground pr-8">
                  {group.products.length} {group.products.length === 1 ? 'Item' : 'Items'}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-12 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {group.products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group space-y-4">
                      <div className="relative aspect-square bg-stone-100 rounded-2xl flex items-center justify-center text-5xl transition-all group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden">
                        {product.badge && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[0.55rem] uppercase tracking-widest font-bold z-10">
                            {product.badge}
                          </div>
                        )}
                        <span className="group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[0.55rem] tracking-widest uppercase text-primary font-bold">{group.name}</p>
                        <h3 className="font-headline text-lg text-stone-900 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-light">{product.model}</p>
                        <div className="pt-2 text-[0.6rem] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
