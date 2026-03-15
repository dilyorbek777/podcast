'use client'

import Image from "next/image"
import { useState } from "react"
import { BiPlay } from "react-icons/bi"
const maxLength = 160;


const VideoCard = ({ category, title, image, createdAt }: {
    category: string, title: string, image: string, createdAt: string
}) => {

    const [isLoading, setIsLoading] = useState(true)


    return (
        <div className=" max-w-[550px] max-h-fit shadow-xl/50 shadow-primary  min-h-[400px]  backdrop-blur-2xl rounded-sd overflow-hidden">
            <div className="w-full overflow-hidden relative">
                <p className="absolute z-10 m-5 px-5 py-3 bg-primary/70 rounded-sd">{category}</p>
                <div className="absolute top-1/2 left-1/2 text-4xl right-1/2 z-20 -translate-y-1/2 -translate-x-1/2   bg-primary w-[50px] h-[50px] flex items-center justify-center rounded-full">
                    <BiPlay />
                </div>
                <Image width={550} height={200} src={image} alt={title} className={` object-cover duration-700 ease-in-out  w-[550px] h-[300px] overflow-hidden group-hover:opacity-75 hover:scale-110 ${isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                    }}`} onLoad={() => setIsLoading(false)} />
            </div>
            <div className="flex flex-col px-4 py-5 gap-1 border-primary border border-t-0  rounded-b-sd" >
                <p className="text-2xl  text-primary font-bold ">{title}</p>
                <p className="font-semibold text-gray-500 text-lg tracking-wide">{createdAt.length >= maxLength ? createdAt.slice(0, maxLength) + "..." : createdAt}</p>
            </div>
        </div>
    )
}

export default VideoCard