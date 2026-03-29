'use client'

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const maxLength = 160;
const titleMaxLength = 32;
const PostCard = ({ category, title, text, image, created_at }: {
    category: string, title: string, text: string, image: string, created_at: string
}) => {

    const [isLoading, setIsLoading] = useState(true)

    const formatDate = (timestamp: string) => {
        const date = new Date(parseInt(timestamp));
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }


    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 min-h-[400px] overflow-hidden">
            <div className="flex">
                <Image
                    width={550}
                    height={300}
                    src={image}
                    alt="redd"
                    className={`relative hover:scale-110 z-20 aspect-video w-full object-cover grayscale duration-700 ease-in-out ${isLoading
                        ? 'scale-110 blur-2xl grayscale'
                        : 'scale-100 blur-0 grayscale-0'
                        }`}
                    onLoad={() => setIsLoading(false)}
                />
                <CardAction className="absolute top-2 right-2 z-30">
                    <Badge variant="secondary">{category}</Badge>
                </CardAction></div>
            <CardHeader>
                <p className="font-semibold text-gray-500 text-lg tracking-wide">{formatDate(created_at)}</p>
                <p className="text-xl text-primary font-bold hover:text-primary-400 transition-all">{title.length >= titleMaxLength ? title.slice(0, titleMaxLength) + "..." : title}</p>
                <p className="text-[14px] my-2 tracking-wide">{text.length >= maxLength ? text.slice(0, maxLength) + "..." : text}</p>
            </CardHeader>
        </Card>
    )
}

export default PostCard