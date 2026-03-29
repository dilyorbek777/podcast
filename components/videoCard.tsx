'use client'

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardAction } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BiPlay } from "react-icons/bi"
const maxLength = 160;
const titleMaxLength = 32;

const VideoCard = ({ category, title, image, createdAt, description }: {
    category: string, title: string, image: string, createdAt: string, description: string
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
            <div className="flex w-full h-[200px] relative">
                <Image
                    width={550}
                    height={300}
                    src={image}
                    alt={title}
                    className={` hover:scale-110 z-20 aspect-video w-full object-cover grayscale duration-700 ease-in-out ${isLoading
                        ? 'scale-110 blur-2xl grayscale'
                        : 'scale-100 blur-0 grayscale-0'
                        }`}
                    onLoad={() => setIsLoading(false)}
                />
                <div className="absolute top-1/2 left-1/2 text-4xl z-20 -translate-y-1/2 -translate-x-1/2 bg-primary w-[50px] h-[50px] flex items-center justify-center rounded-full">
                    <BiPlay />
                </div>
                <CardAction className="absolute top-2 right-2 z-30">
                    <Badge variant="secondary">{category}</Badge>
                </CardAction>
            </div>
            <CardHeader>
                <p className="font-semibold text-gray-500 text-lg tracking-wide">{formatDate(createdAt)}</p>

                <p className="text-xl text-primary font-bold hover:text-primary-400 transition-all">{title.length >= titleMaxLength ? title.slice(0, titleMaxLength) + "..." : title}</p>
                <p className="text-gray-500 text-sm">{description.length >= maxLength ? description.slice(0, maxLength) + "..." : description}</p>
            </CardHeader>
        </Card>
    )


}

export default VideoCard