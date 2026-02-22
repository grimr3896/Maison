import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/catalog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { Recommendations } from "@/components/Recommendations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default async function ProductPage({ params }: { params: Promise<{ categoryId: string, groupId: string, productId: string }> }) {
  const { productId, categoryId, groupId } = await params;
  const result = getProductById(productId);

  if (!result || result.category.id !== categoryId || Object.keys(result.category.groups).find(k => k === groupId) === undefined) {
     if (!result) return notFound();
  }
  
  const { product, category, group } = result;
  const prodImage = PlaceHolderImages.find(img => img.id === product.image);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-24 sm:pt-32 pb-16 sm:pb-20 px-[5%]">
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-[0.6rem] xs:text-[0.68rem] uppercase tracking-widest text-muted-foreground mb-8 sm:mb-16">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="opacity-30">/</span>
          <Link href={`/${category.id}`} className="hover:text-primary">{category.label}</Link>
          <span className="opacity-30">/</span>
          <Link href={`/${category.id}/${Object.keys(category.groups).find(k => category.groups[k].name === group.name)}`} className="hover:text-primary">{group.name}</Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Area */}
          <div className="relative aspect-square bg-stone-100 rounded-3xl sm:rounded-[2.5rem] lg:sticky lg:top-32 overflow-hidden shadow-sm group">
            <div className="bg-grain opacity-5 z-10" />
            {prodImage && (
              <Image 
                src={prodImage.imageUrl} 
                alt={prodImage.description} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                data-ai-hint={prodImage.imageHint}
              />
            )}
          </div>

          {/* Info Area */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl">{product.emoji}</span>
                <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.3em] uppercase text-primary font-bold">
                  {category.id} › {group.name}
                </p>
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-6xl text-stone-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground font-light text-xs sm:text-sm italic">{product.model}</p>
            </div>

            <div className="h-px bg-stone-200" />

            <div className="space-y-6">
              <p className="text-stone-700 leading-relaxed font-light text-sm sm:text-base">
                {product.desc}
              </p>
              
              <ul className="space-y-3 sm:space-y-4">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-light text-stone-600 border-b border-stone-200/50 pb-3 last:border-0">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-stone-200" />

            <div className="space-y-6">
              <Link href={`/${categoryId}/${groupId}/${productId}/inquiry`} className="block">
                <Button className="w-full py-6 sm:py-8 text-xs sm:text-sm tracking-[0.2em] uppercase rounded-xl hover:shadow-2xl transition-all gap-3 bg-stone-900 hover:bg-primary">
                  Inquire About This Item
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-center text-[0.55rem] sm:text-[0.65rem] text-muted-foreground tracking-wide font-light">
                No payment needed now — our team will reach out with a personalized quote.
              </p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <section className="mt-20 sm:mt-32 space-y-8 sm:space-y-10">
          <div className="text-center lg:text-left">
            <p className="text-[0.55rem] sm:text-[0.62rem] tracking-[0.2em] uppercase text-primary font-bold mb-2">Technical Details</p>
            <h2 className="font-headline text-2xl sm:text-3xl">Specifications</h2>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            {product.specs.map((spec, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 space-y-2">
                <p className="text-[0.5rem] sm:text-[0.55rem] tracking-widest uppercase text-muted-foreground">{spec.l}</p>
                <p className="text-stone-900 font-medium text-sm sm:text-base">{spec.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GenAI Recommendations */}
        <Recommendations currentProductId={product.id} />
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
}
