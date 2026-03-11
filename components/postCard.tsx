'use client'

import Image from "next/image"
import { useState } from "react"


const PostCard = ({ category, title, text, image }: {
    category: string, title: string, text: string, image: string
}) => {

    const [isLoading, setIsLoading] = useState(true)


    return (
        <div className=" max-w-[550px] max-h-fit shadow-xl/50 shadow-primary  min-h-[400px]  backdrop-blur-2xl rounded-sd overflow-hidden">
            <div className="w-full overflow-hidden relative">
                <p className="absolute z-10 m-5 px-5 py-3 bg-primary/70 rounded-sd">{category}</p>
                <Image width={550} height={200} src={image} alt="redd" className={` object-cover duration-700 ease-in-out  w-[550px] h-[300px] overflow-hidden group-hover:opacity-75 hover:scale-110 ${isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                    }}`} onLoad={() => setIsLoading(false)} />
            </div>
            <div className="flex flex-col px-4 py-5 gap-1 border-primary border border-t-0  rounded-b-sd" >
                <p className="font-semibold text-gray-500  text-lg tracking-wide">{("2026-03-01T12:49:06.539842").split('T')[0].split("-").join(".")}</p>
                <p className="text-2xl  text-primary font-bold hover:text-primary-400 transition-all ">{title}</p>
                <p className="text-[16px] my-2 tracking-wide">{text}</p>
            </div>
        </div>
    )
}

export default PostCard