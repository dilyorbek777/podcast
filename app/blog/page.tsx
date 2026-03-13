import type { Metadata } from "next"
import BlogClient from "@/components/BlogClient"
import { about, siteDetails } from "@/constants"

export const metadata: Metadata = {
    title: "Blog",
    description: "Explore our latest articles, tutorials, and podcast updates.",

    openGraph: {
        title: `Blog | ${siteDetails.title}`,
        description: "Explore our latest articles and podcast updates.",
        url: `${siteDetails.url}/blog`,
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
        title: `Blog | ${siteDetails.title}`,
        description: "Explore our latest articles and podcast updates.",
        images: [about[0].img || "/podcast.jpg"],
    },
}

export default function Page() {
    return <BlogClient />
}