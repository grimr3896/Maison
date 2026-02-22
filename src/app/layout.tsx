import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'MaisonAI — Elevate Your Home',
  description: 'Premium Kitchen, Furniture, and Gaming Collections.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <Script 
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" 
          strategy="beforeInteractive" 
        />
        <Script id="emailjs-init" strategy="afterInteractive">
          {`
            (function() {
              emailjs.init({
                publicKey: "CVruh77CgutwA2-c9",
              });
            })();
          `}
        </Script>
      </head>
      <body className="font-body antialiased selection:bg-primary/30 selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
