"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATALOG } from "@/lib/catalog";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isDark = isHome && !isScrolled;

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
          "font-headline text-2xl tracking-widest transition-colors",
          isDark ? "text-background" : "text-foreground"
        )}
      >
        MAISON
      </Link>

      <div
        className={cn(
          "hidden md:flex items-center border rounded-full overflow-hidden transition-all",
          isDark ? "border-background/20" : "border-border"
        )}
      >
        {Object.entries(CATALOG).map(([key, cat]) => (
          <Link
            key={key}
            href={`/category/${key}`}
            className={cn(
              "px-6 py-2 text-[0.7rem] uppercase tracking-widest transition-all border-r last:border-r-0 hover:bg-primary hover:text-primary-foreground",
              pathname.includes(`/category/${key}`)
                ? "bg-primary text-primary-foreground"
                : isDark
                ? "text-background/80 border-background/10"
                : "text-foreground/70 border-border"
            )}
          >
            {cat.emoji} {cat.id}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className={cn(
          "text-[0.68rem] uppercase tracking-widest transition-colors hover:text-primary",
          isDark ? "text-background/40" : "text-muted-foreground"
        )}
      >
        {isHome ? "Curated Collections" : "← Back Home"}
      </Link>
    </nav>
  );
}
