import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import the Script component for adding analytics
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Investment Better",
  description: "World Best Insurance Site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Add Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-EDD7G93BTD`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EDD7G93BTD', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {children}
        <Toaster />
      </body>
    </html>
  );
}
