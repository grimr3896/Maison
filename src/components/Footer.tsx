import Link from "next/link";
import { CATALOG } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 sm:py-16 px-[5%] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 sm:mb-16">
        <div className="space-y-4">
          <div className="font-headline text-xl sm:text-2xl tracking-widest text-white">MAISON</div>
          <p className="text-xs sm:text-sm leading-relaxed font-light text-stone-400 max-w-xs">
            A curated home and lifestyle store. Quality kitchen appliances, furniture, and gaming essentials — all in one place.
          </p>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <p className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-primary font-bold">Collections</p>
          <ul className="space-y-2 sm:space-y-3">
            {Object.entries(CATALOG).map(([key, cat]) => (
              <li key={key}>
                <Link href={`/${key}`} className="text-xs sm:text-sm font-light hover:text-white transition-colors">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <p className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-primary font-bold">Company</p>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-light">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Delivery Info</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Returns Policy</Link></li>
          </ul>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <p className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-primary font-bold">Contact</p>
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-light">
            <li className="text-stone-400">brisbaneloaders@gmail.com</li>
            <li className="text-stone-400">Brisbane CBD, QLD, Australia</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.55rem] sm:text-[0.66rem] uppercase tracking-widest text-stone-500">
        <p>© 2025 Maison Store. All rights reserved.</p>
        <p className="hidden xs:block">Crafted with elegance</p>
      </div>
    </footer>
  );
}
