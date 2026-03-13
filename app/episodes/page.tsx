import type { Metadata } from "next"
import EpisodesClient from "@/components/EpisodesClient"
import { about, siteDetails } from "@/constants"

export const metadata: Metadata = {
    title: "Episodes",
    description: "Watch all podcast episodes, interviews, and discussions.",

    keywords: [
        "podcast episodes",
        "tech podcast",
        "developer podcast",
        "video podcast"
    ],

    alternates: {
        canonical: `${siteDetails.url}/episodes`,
    },

    openGraph: {
        title: `Episodes | ${siteDetails.title}`,
        description: "Watch all podcast episodes and interviews.",
        url: `${siteDetails.url}/episodes`,
        siteName: siteDetails.title,
        images: [
            {

                url: about[0].img || "/podcast.jpg",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: `Episodes | ${siteDetails.title}`,
        description: "Watch all podcast episodes and interviews.",
        images: [about[0].img || "/podcast.jpg"],
    },

    robots: {
        index: true,
        follow: true,
    },
}

export default function Page() {
    return <EpisodesClient />
}