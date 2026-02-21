
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { generateProductRecommendations, ProductRecommendationOutput } from "@/ai/flows/generate-product-recommendations";
import { getProductById } from "@/lib/catalog";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface Props {
  currentProductId: string;
}

export function Recommendations({ currentProductId }: Props) {
  const [recs, setRecs] = useState<ProductRecommendationOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecs() {
      try {
        setLoading(true);
        const result = await generateProductRecommendations({ currentProductId });
        setRecs(result);
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecs();
  }, [currentProductId]);

  if (loading) {
    return (
      <div className="space-y-8 mt-16">
        <h3 className="font-headline text-2xl">Curated for You</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!recs || recs.recommendations.length === 0) return null;

  return (
    <div className="space-y-8 mt-16 reveal visible">
      <div>
        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-primary mb-2">Smart Suggestion</p>
        <h3 className="font-headline text-2xl">Because You Liked This</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recs.recommendations.map((rec) => {
          const item = getProductById(rec.id);
          if (!item) return null;
          
          const { category, product } = item;
          const groupId = Object.keys(category.groups).find(k => category.groups[k].name === item.group.name);
          const prodImage = PlaceHolderImages.find(img => img.id === product.image);
          
          return (
            <Link key={rec.id} href={`/${category.id}/${groupId}/${rec.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group border-none bg-stone-100/50">
                <CardContent className="p-0">
                  <div className="aspect-square relative flex items-center justify-center bg-stone-200/50 overflow-hidden">
                    {prodImage && (
                      <Image 
                        src={prodImage.imageUrl} 
                        alt={prodImage.description} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={prodImage.imageHint}
                      />
                    )}
                  </div>
                  <div className="p-6 space-y-2">
                    <p className="text-[0.55rem] uppercase tracking-widest text-primary font-bold">
                      {item.group.name}
                    </p>
                    <h4 className="font-headline text-lg group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic">
                      &quot;{rec.reason}&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
