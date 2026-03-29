"use client"

import PostCard from "@/components/postCard"
import Link from "next/link"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Filter } from "lucide-react"

const POSTS_PER_PAGE = 6

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
}

const Blog = () => {

    const blogs = useQuery(api.blogs.getBlogs)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const data = useMemo(() => {
        if (!blogs) return []
        
        let filtered = [...blogs].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(blog => 
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        
        // Filter by categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(blog => 
                selectedCategories.includes(blog.category)
            )
        }
        
        return filtered
    }, [blogs, searchQuery, selectedCategories])

    const totalPages = useMemo(
        () => Math.ceil(data.length / POSTS_PER_PAGE),
        [data]
    )
    
    // Get unique categories from blogs
    const categories = useMemo(() => {
        if (!blogs) return []
        const uniqueCategories = [...new Set(blogs.map(blog => blog.category))]
        return uniqueCategories
    }, [blogs])

    const currentPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE
        return data.slice(start, start + POSTS_PER_PAGE)
    }, [data, currentPage])

    if (!blogs) return (<div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 w-full h-screen absolute z-50">
        {/* Spinner Animation */}
        <div className="w-12 h-12 border-4 border-blue-200 border-t-primary-600 rounded-full animate-spin"></div>

        <p className="text-primary font-medium animate-pulse">
            Site is loading...
        </p>
    </div>);

    return (
        <section className="max-w-[1720px] mx-auto w-full p-24 max-md:p-4 min-h-screen flex flex-col items-center">

            <h1 className="text-5xl font-bold my-12 max-md:my-16 text-center">
                Explore our blogs
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-2xl">
                <div className="flex gap-2 w-full">
                    <Input
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                    <Button variant="outline" className="outline-none" size="icon">
                        <Search className="h-4 w-4" />
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
                animate="visible"
                className="grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1 gap-10 my-8"
            >
                {currentPosts.map((post) => (
                    <motion.div key={post._id} variants={itemVariants}>
                        <Link href={`/blog/${post._id}`} id={post._id}>
                            <PostCard
                                created_at={post.createdAt.toString()}
                                category={post.category}
                                image={post.imageUrl}
                                text={post.description}
                                title={post.title}
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
    )
}

export default Blog