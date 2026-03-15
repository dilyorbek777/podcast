"use client"

import PostCard from "@/components/postCard"
import Link from "next/link"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

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

    const data = blogs ?? []

    const totalPages = useMemo(
        () => Math.ceil(data.length / POSTS_PER_PAGE),
        [data]
    )

    const currentPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE
        return data.slice(start, start + POSTS_PER_PAGE)
    }, [data, currentPage])

    if (!blogs) return <div>Loading...</div>

    return (
        <section className="max-w-[1720px] mx-auto w-full p-24 max-md:p-4 min-h-screen flex flex-col items-center">

            <h1 className="text-5xl font-bold my-12 max-md:my-16 text-center">
                Explore our blogs
            </h1>

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
    )
}

export default Blog