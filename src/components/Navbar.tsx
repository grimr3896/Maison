
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATALOG } from "@/lib/catalog";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  // On the server and initial client render, isScrolled is false.
  const isDarkHero = isHome && !isScrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[70px] px-[5%] flex items-center justify-between transition-all duration-300",
        isScrolled || !isHome
          ? "bg-background/90 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <Link
        href="/"
        className={cn(
          "font-headline text-xl xs:text-2xl tracking-widest transition-colors",
          isDarkHero ? "text-background" : "text-foreground"
        )}
      >
        MAISON
      </Link>

      {/* Desktop Navigation */}
      <div
        className={cn(
          "hidden lg:flex items-center border rounded-full overflow-hidden transition-all",
          isDarkHero ? "border-background/20" : "border-border"
        )}
      >
        {Object.entries(CATALOG).map(([key, cat]) => (
          <Link
            key={key}
            href={`/${key}`}
            className={cn(
              "px-6 py-2 text-[0.7rem] uppercase tracking-widest transition-all border-r last:border-r-0 hover:bg-primary hover:text-primary-foreground",
              pathname === `/${key}` || pathname.startsWith(`/${key}/`)
                ? "bg-primary text-primary-foreground"
                : isDarkHero
                ? "text-background/80 border-background/10"
                : "text-foreground/70 border-border"
            )}
          >
             {cat.id}
          </Link>
        ))}
        <Link
          href="/about"
          className={cn(
            "px-6 py-2 text-[0.7rem] uppercase tracking-widest transition-all hover:bg-primary hover:text-primary-foreground",
            pathname === "/about"
              ? "bg-primary text-primary-foreground"
              : isDarkHero
              ? "text-background/80 border-background/10"
              : "text-foreground/70 border-border"
          )}
        >
          About
        </Link>
      </div>

      {/* Mobile Navigation Trigger */}
      <div className="lg:hidden flex items-center gap-4">
        {mounted ? (
          <Sheet>
            <SheetTrigger asChild>
              <button className={cn(
                "p-2 rounded-lg transition-colors",
                isDarkHero ? "text-background hover:bg-white/10" : "text-foreground hover:bg-stone-200"
              )}>
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-stone-50 border-stone-200 w-[80%] sm:w-[350px]">
              <div className="flex flex-col gap-8 pt-16">
                <Link href="/" className="font-headline text-3xl tracking-widest text-stone-900 px-4">
                  MAISON
                </Link>
                <div className="flex flex-col">
                  {Object.entries(CATALOG).map(([key, cat]) => (
                    <Link
                      key={key}
                      href={`/${key}`}
                      className={cn(
                        "py-6 px-4 text-sm uppercase tracking-[0.2em] font-bold border-b border-stone-200 transition-colors",
                        pathname === `/${key}` ? "text-primary" : "text-stone-500 hover:text-primary"
                      )}
                    >
                      {cat.label}
                    </Link>
                  ))}
                  <Link
                    href="/about"
                    className={cn(
                      "py-6 px-4 text-sm uppercase tracking-[0.2em] font-bold border-b border-stone-200 transition-colors",
                      pathname === "/about" ? "text-primary" : "text-stone-500 hover:text-primary"
                    )}
                  >
                    Our Story
                  </Link>
                </div>
                <p className="px-4 text-[0.6rem] uppercase tracking-widest text-stone-400 font-light mt-auto pb-8">
                  © 2025 Maison Store
                </p>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <button className={cn(
            "p-2 rounded-lg transition-colors",
            isDarkHero ? "text-background hover:bg-white/10" : "text-foreground hover:bg-stone-200"
          )}>
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>

      <Link
        href="/"
        className={cn(
          "hidden sm:block text-[0.68rem] uppercase tracking-widest transition-colors hover:text-primary",
          isDarkHero ? "text-background/40" : "text-muted-foreground"
        )}
      >
        {isHome ? "Curated Collections" : "← Back Home"}
      </Link>
    </nav>
  );
}
