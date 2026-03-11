import { Metadata } from "next";

interface Episode {
  id: string;
  title: string;
  video: string;
  poster: string;
  created_at: string;
  category: string;
}

async function getEpisode(id: string): Promise<Episode> {
  const res = await fetch(`${process.env.API_URL}/api/episodes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Episode not found");
  }

  return res.json();
}

/* ---------- SEO / OpenGraph ---------- */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const episode = await getEpisode(id);

  return {
    title: episode.title,
    description: `Watch "${episode.title}" in category ${episode.category}`,
    openGraph: {
      title: episode.title,
      description: `Watch "${episode.title}" in category ${episode.category}`,
      images: [
        {
          url: episode.poster,
          width: 1200,
          height: 630,
          alt: episode.title,
        },
      ],
      type: "video.other",
      videos: [
        {
          url: episode.video,
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      card: "player",
      title: episode.title,
      description: `Watch "${episode.title}" in category ${episode.category}`,
      images: [episode.poster],
    },
  };
}

/* ---------- PAGE ---------- */
export default async function EpisodePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const episode = await getEpisode(id);

  return (
    <article className="max-w-4xl mx-auto px-6 py-16  my-20">
      {/* Category */}
      <span className="text-sm text-primary font-medium">
        {episode.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
        {episode.title}
      </h1>

      {/* Date */}
      <p className="text-gray-500 text-sm mt-2">
        {new Date(episode.created_at).toLocaleDateString()}
      </p>

      {/* Video */}
      <div className="mt-10 w-full relative rounded-2xl overflow-hidden">
        <video
          src={episode.video}
          poster={episode.poster}
          controls
          className="w-full h-[400px] object-cover rounded-2xl"
        />
      </div>
    </article>
  );
}