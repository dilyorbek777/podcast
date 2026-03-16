import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function getEpisode(id: string) {
  const episode = await convex.query(api.episode.getEpisode, {
    id: id as unknown as Id<"episodes">,
  });

  return episode ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {

  const { id } = await params;

  const episode = await getEpisode(id);

  if (!episode) {
    return {
      title: "Episode not found",
    };
  }

  return {
    title: episode.title,
    description: episode.description,

    openGraph: {
      title: episode.title,
      description: episode.description,
      type: "video.episode",

      images: episode.posterUrl
        ? [
          {
            url: episode.posterUrl,
            width: 1200,
            height: 630,
            alt: episode.title,
          },
        ]
        : undefined,

      videos: episode.videoUrl
        ? [
          {
            url: episode.videoUrl,
            width: 1280,
            height: 720,
            type: "video/mp4",
          },
        ]
        : undefined,
    },

    twitter: {
      card: "player",
      title: episode.title,
      description: episode.description,
      images: episode.posterUrl ? [episode.posterUrl] : [],
    },
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;

  const episode = await getEpisode(id);

  if (!episode) {
    return <div className="text-center py-20">Episode not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 my-20">
      <span className="text-sm font-medium text-primary my-3">
        {episode.category}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold">
        {episode.title}
      </h1>

      <p className="text-gray-400 mt-3">
        {new Date(episode.createdAt).toLocaleDateString()}
      </p>


      {/* Video PLAYER */}
      <div className="relative">
        {episode.videoUrl && (
          <div className="mt-10">
            <video controls className="w-full h-[500px] object-cover rounded-sd outline-none " poster={episode.posterUrl}>
              <source src={episode.videoUrl} />
            </video>
          </div>
        )}
        {episode.videoUrl && (
          <div className="mt-10">
            <Image src={episode.posterUrl} alt={episode.title} className="w-full  absolute top-0 -z-20 scale-105 clip-path-[ellipse(50%_59%_at_49%_75%)]  blur-3xl h-[500px] object-cover rounded-sd outline-none " width={700} height={500} />
          </div>
        )}
      </div>

      <div className="prose prose-lg mt-10 text-white">
        <p>{episode.description}</p>
      </div>
    </div>
  );
}