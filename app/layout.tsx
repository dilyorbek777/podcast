import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

import { siteDetails } from "@/constants";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import SyncUser from "@/components/SyncUser";
import Link from "next/link";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteDetails.url),

  title: {
    default: siteDetails.sub,
    template: `%s | ${siteDetails.sub}`,
  },

  description: siteDetails.text,

  keywords: [
    "podcast",
    "tech podcast",
    "programming",
    "development",
    "technology"
  ],

  authors: [{ name: siteDetails.author }],

  openGraph: {
    title: siteDetails.sub,
    description: siteDetails.text,
    url: siteDetails.url,
    siteName: siteDetails.sub,
    images: [
      {
        url: "/bg.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteDetails.sub,
    description: siteDetails.text,
    images: ["/bg.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-white text-black">
        <ClerkProvider>

          <ConvexClientProvider>
            <Navbar />
            <main>
              <SyncUser />{children}</main>
            <Link href={'/contact'} className="px-5 py-3 rounded-sd bg-primary shadow-2xl shadow-primary fixed bottom-5 right-5 z-30 font-bold  flex items-center justify-center gap-2 hover:bg-primary-600 text-white"><Send /> <span className="max-md:hidden">Contact Us</span></Link>
          </ConvexClientProvider>


        </ClerkProvider>
      </body>
    </html >
  );
}