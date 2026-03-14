
import AIContent from '@/components/AiContent';
import { about, siteDetails } from '@/constants';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'AI Startup Kit | AI-driven SEO & Rankings',
    description: "Boost your rankings with AI. Elevate your site\'s visibility effortlessly with smart technology and user-friendly SEO tools.",

    openGraph: {
        title: `AI Startup | ${siteDetails.sub}`,
        description: "Boost your rankings with AI. Elevate your site\'s visibility effortlessly with smart technology and user-friendly SEO tools.",
        url: `${siteDetails.url}/ai`,
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
        title: `AI Startup | ${siteDetails.sub}`,
        description: "Harness the power of AI to make search engine optimization intuitive and effective.",
        images: [about[0].img || "/podcast.jpg"],
    },
}


export default function Page() {
    return <AIContent />;
}