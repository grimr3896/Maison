import { notFound } from "next/navigation";
import Image from "next/image";
import { CATALOG } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowLeft } from "lucide-react";

export default async function GroupPage({ params }: { params: Promise<{ categoryId: string, groupId: string }> }) {
  const { categoryId, groupId } = await params;
  const category = CATALOG[categoryId as keyof typeof CATALOG];
  const group = category?.groups[groupId];

  if (!group) return notFound();

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <header className="pt-40 pb-20 px-[5%] max-w-7xl mx-auto space-y-8">
        <nav className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest text-stone-900/40">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href={`/${categoryId}`} className="hover:text-primary transition-colors">{category.label}</Link>
          <span className="opacity-30">/</span>
          <span className="text-stone-900/80 font-bold">{group.name}</span>
        </nav>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{group.emoji}</span>
            <p className="text-[0.7rem] tracking-[0.4em] uppercase text-primary font-bold">{group.label}</p>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl text-stone-900">{group.name}</h1>
          <p className="text-muted-foreground font-light max-w-2xl text-lg leading-relaxed">
            Discover our curated selection of {group.name.toLowerCase()}. Each piece is chosen for its quality and timeless appeal.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-[5%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {group.products.map((product) => {
            const prodImage = PlaceHolderImages.find(img => img.id === product.image);
            return (
              <Link key={product.id} href={`/${categoryId}/${groupId}/${product.id}`} className="group space-y-5">
                <div className="relative aspect-square bg-white rounded-[2.5rem] overflow-hidden transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2 border border-stone-200/50">
                  <div className="bg-grain opacity-[0.03] z-10" />
                  {product.badge && (
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary text-white text-[0.55rem] uppercase tracking-widest font-black z-20 shadow-lg">
                      {product.badge}
                    </div>
                  )}
                  {prodImage && (
                    <Image 
                      src={prodImage.imageUrl} 
                      alt={prodImage.description} 
                      fill 
                      sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      data-ai-hint={prodImage.imageHint}
                    />
                  )}
                </div>
                <div className="space-y-2 px-2">
                  <h3 className="font-headline text-2xl text-stone-900 group-hover:text-primary transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light tracking-wide uppercase">{product.model}</p>
                  <div className="pt-4 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                    Explore Item <ArrowLeft className="w-3 h-3 rotate-180" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
}