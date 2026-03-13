
import About from "@/components/About";
import { about, siteDetails } from "@/constants"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our podcast, our mission, and the team behind it.",

  openGraph: {
    title: "About Us | " + siteDetails.sub,
    description: "Learn more about our podcast and our mission.",
    url: `${siteDetails.url}/about`,
    images: [
      {
        url: about[0].img || "/podcast.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Us | " + siteDetails.sub,
    description: "Learn more about our podcast and our mission.",
    images: [about[0].img || "/podcast.jpg"],
  },
};
export default function Page() {
  return <About />;
}