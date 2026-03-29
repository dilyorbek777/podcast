"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import VideoCard from "@/components/videoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter } from "lucide-react";

const VIDS_PER_PAGE = 6;

export default function EpisodesClient() {
  const episodes = useQuery(api.episode.getEpisodes);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const data = useMemo(() => {
    if (!episodes) return []
    
    let filtered = [...episodes].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(episode => 
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(episode => 
        selectedCategories.includes(episode.category)
      )
    }
    
    return filtered
  }, [episodes, searchQuery, selectedCategories])

  const totalPages = Math.ceil(data.length / VIDS_PER_PAGE)
  
  // Get unique categories from episodes
  const categories = useMemo(() => {
    if (!episodes) return []
    const uniqueCategories = [...new Set(episodes.map(ep => ep.category))]
    return uniqueCategories
  }, [episodes])

  if (!episodes) {
    return <div className="text-center py-20">Loading episodes...</div>;
  }

  const start = (currentPage - 1) * VIDS_PER_PAGE
  const end = start + VIDS_PER_PAGE

  const currentVids = data.slice(start, end)
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
    <section className="max-w-[1720px] mx-auto w-full p-24 max-md:p-4 min-h-screen flex flex-col items-center max-lg:pb-20">
      <h1 className="text-5xl font-bold my-18 text-center">
        Podcast Episodes
      </h1>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-2xl">
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Search episodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" className="outline-none" size="icon">
            <Search className="h-4 w-4 " />
          </Button>
        </div>
        
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
              {selectedCategories.length > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                  {selectedCategories.length}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter by Categories</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, category])
                      } else {
                        setSelectedCategories(selectedCategories.filter(c => c !== category))
                      }
                    }}
                    className="rounded"
                  />
                  <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedCategories([])}
              >
                Clear All
              </Button>
              <Button onClick={() => setIsFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                createdAt={vid.createdAt.toString()}
                description={vid.description}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>


      <div className="flex gap-3 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            size="sm"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </section>
  );
}