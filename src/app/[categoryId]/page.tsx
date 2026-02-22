import { notFound } from "next/navigation";
import Image from "next/image";
import { CATALOG } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  const category = CATALOG[categoryId as keyof typeof CATALOG];

  if (!category) return notFound();

  const heroImage = PlaceHolderImages.find(img => img.id === category.image);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      {/* Category Hero */}
      <section className={`relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-[5%] overflow-hidden bg-white text-stone-900`}>
        {heroImage && (
          <div className="absolute inset-0 opacity-10">
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description} 
              fill 
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          </div>
        )}
        <div className="bg-grain" />
        <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <nav className="flex items-center gap-3 text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-stone-900/40">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-stone-900/80 font-bold">{category.label}</span>
          </nav>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <p className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.4em] uppercase text-primary font-bold">{category.label}</p>
              <h1 className="font-headline text-4xl sm:text-6xl lg:text-8xl leading-tight whitespace-pre-line tracking-tight text-stone-900">
                {category.title}
              </h1>
            </div>
            <p className="text-stone-600 font-light max-w-xl text-base sm:text-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              {category.sub}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
            {Object.entries(category.groups).map(([gk, group]) => (
              <Link
                key={gk}
                href={`/${categoryId}/${gk}`}
                className="px-4 sm:px-8 py-2 sm:py-3 border border-stone-900/10 bg-white/40 backdrop-blur-md rounded-full text-[0.55rem] sm:text-[0.62rem] tracking-[0.2em] uppercase font-bold hover:bg-stone-900 hover:text-white transition-all duration-300 shadow-sm"
              >
                {group.emoji} {group.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-16 sm:py-24 px-[5%] space-y-12 sm:space-y-16">
        <div className="max-w-xl space-y-4">
          <p className="text-[0.6rem] sm:text-[0.62rem] tracking-[0.2em] uppercase text-primary font-bold">Browse by Group</p>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl">Curated Collections</h2>
          <p className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed">
            Explore our thoughtfully organized groups. Every item is selected for its balance of beauty and utility.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full border-t border-stone-200">
          {Object.entries(category.groups).map(([gk, group]) => (
            <AccordionItem value={gk} key={gk} className="border-b border-stone-200">
              <AccordionTrigger className="hover:no-underline group py-8 sm:py-10 px-2 sm:px-4">
                <div className="flex items-center gap-4 sm:gap-8 text-left">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[1.5rem] bg-stone-100 flex items-center justify-center text-2xl sm:text-4xl group-hover:bg-stone-200 group-hover:shadow-inner transition-all duration-500 overflow-hidden relative">
                    <div className="bg-grain opacity-5 z-10" />
                    {group.emoji}
                  </div>
                  <div>
                    <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.15em] uppercase text-primary font-bold mb-1 sm:mb-2">{group.label}</p>
                    <p className="font-headline text-xl sm:text-3xl text-stone-900">{group.name}</p>
                  </div>
                </div>
                <div className="hidden sm:block text-[0.65rem] sm:text-[0.68rem] tracking-widest uppercase text-muted-foreground/60 pr-8 sm:pr-12 font-medium">
                  {group.products.length} {group.products.length === 1 ? 'Item' : 'Items'}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-12 sm:pb-16 pt-6 sm:pt-8 px-2 sm:px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10">
                  {group.products.map((product) => {
                    const prodImage = PlaceHolderImages.find(img => img.id === product.image);
                    return (
                      <Link key={product.id} href={`/${categoryId}/${gk}/${product.id}`} className="group space-y-4 sm:space-y-5">
                        <div className="relative aspect-square bg-stone-100 rounded-2xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border border-transparent group-hover:border-stone-200">
                          <div className="bg-grain opacity-[0.03] z-10" />
                          {product.badge && (
                            <div className="absolute top-4 left-4 sm:top-5 left-5 px-3 py-1 sm:px-4 sm:py-1.5 bg-primary text-white text-[0.5rem] sm:text-[0.55rem] uppercase tracking-widest font-black z-20 shadow-lg">
                              {product.badge}
                            </div>
                          )}
                          {prodImage && (
                            <Image 
                              src={prodImage.imageUrl} 
                              alt={prodImage.description} 
                              fill 
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              data-ai-hint={prodImage.imageHint}
                            />
                          )}
                        </div>
                        <div className="space-y-2 px-1">
                          <p className="text-[0.5rem] sm:text-[0.55rem] tracking-widest uppercase text-primary font-bold">{group.name}</p>
                          <h3 className="font-headline text-lg sm:text-xl text-stone-900 group-hover:text-primary transition-colors leading-snug">
                            {product.name}
                          </h3>
                          <p className="text-[0.65rem] sm:text-xs text-muted-foreground font-light tracking-wide">{product.model}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-8 sm:mt-12 text-center">
                  <Link 
                    href={`/${categoryId}/${gk}`}
                    className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] font-bold text-stone-900 hover:text-primary transition-colors border-b-2 border-primary/20 pb-1"
                  >
                    View All {group.name} →
                  </Link>
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
