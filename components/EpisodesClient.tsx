"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import VideoCard from "@/components/videoCard";

const VIDS_PER_PAGE = 6;

export default function EpisodesClient() {
  const episodes = useQuery(api.episode.getEpisodes);
  const [currentPage, setCurrentPage] = useState(1)


  if (!episodes) {
    return <div className="text-center py-20">Loading episodes...</div>;
  }


  const totalPages = Math.ceil(episodes.length / VIDS_PER_PAGE)

  const start = (currentPage - 1) * VIDS_PER_PAGE
  const end = start + VIDS_PER_PAGE

  const currentVids = episodes.slice(start, end)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    },
  };


  return (
    <section className="max-w-[1720px] mx-auto w-full p-24 max-md:p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-bold my-18 text-center">
        Podcast Episodes
      </h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" className="grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1 gap-10 my-8">
        {currentVids.map((vid) => (
          <motion.div key={vid._id} variants={itemVariants}>
            <Link href={`/episodes/${vid._id}`} >
              <VideoCard
                category={vid.category}
                image={vid.posterUrl}
                title={vid.title}
                createdAt={vid.description}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>


      <div className="flex gap-3 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-sd font-bold transition-all cursor-pointer border duration-150
                        ${currentPage === i + 1
                ? "bg-primary text-white"
                : "bg-black text-primary hover:bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}