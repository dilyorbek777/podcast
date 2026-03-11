import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { siteDetails } from "@/constants";
import Navbar from "@/components/navbar";



const poppins = Poppins({
  weight: ['400', '700'], // Specify the weights you need
  subsets: ['latin'], // Specify the subsets
  display: 'swap', // Use 'swap' for better performance
  variable: '--font-poppins', // Optional: Define a CSS variable
});

export const metadata: Metadata = {
  title: siteDetails.title,
  description: siteDetails.text,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
