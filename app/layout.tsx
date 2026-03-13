import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { siteDetails } from "@/constants";
import Navbar from "@/components/navbar";

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
    default: siteDetails.title,
    template: `%s | ${siteDetails.title}`,
  },

  description: siteDetails.text,

  keywords: [
    "podcast",
    "tech podcast",
    "programming",
    "development",
    "technology"
  ],

  authors: [{ name: siteDetails.title }],

  openGraph: {
    title: siteDetails.title,
    description: siteDetails.text,
    url: siteDetails.url,
    siteName: siteDetails.title,
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
    title: siteDetails.title,
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
      className={poppins.variable}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-white text-black">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}