"use client"

import { siteDetails, users } from "@/constants"
import Image from "next/image"
import { IoIosPlay } from "react-icons/io"
import { motion } from "framer-motion"
import Link from "next/link"

const Home = () => {
  return (
    <div className="relative mx-auto max-h-screen min-h-screen">

      <Image
        className="w-full h-screen top-0 object-top object-cover absolute"
        alt={siteDetails.sub}
        src={"/bg.png"}
        width={1700}
        height={700}
      />

      <div className="overlay bg-gradient-to-t from-[#000000] via-[#0000001a] to-[#00000000] absolute w-full h-screen z-10">

        <div className="flex flex-col gap-4 items-center justify-center h-11/12">

          <div className="h-[45vh]"></div>

          {/* Title Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-semibold text-[78px] leading-[80px] max-lg:leading-[60px] tracking-[-0.02em] text-center max-w-[841px] mx-auto max-lg:text-[48px] "
          >
            {siteDetails.title}
          </motion.h1>

          {/* Button Animation */}
          <div className="flex items-center gap-7 flex-wrap justify-center">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-primary hover:bg-primary-700 transition-all px-7 py-4 flex items-center justify-center gap-2 rounded-sd text-lg cursor-pointer"
            >
              <Link href="/episodes" className="flex gap-2 items-center justify-center">

                Latest episode <IoIosPlay />
              </Link>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="border border-primary backdrop-blur-sm hover:backdrop-blur-2xl font-bold  text-primary transition-all px-7 py-4 flex items-center justify-center gap-2 rounded-sd text-lg cursor-pointer"
            >
              <Link href="/ai" className="flex gap-2 items-center justify-center">

                Try AI
                <span className="text-sm px-1 py-0 rounded-sd border-primary border text-black bg-primary hover:opacity-80">PRO</span>

              </Link>
            </motion.button>
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col my-8 gap-3"
          >
            <p className="font-medium text-[18px] tracking-[-0.002em]">
              From great minds that inspire
            </p>

            <div className="flex -space-x-4 items-center justify-center">
              {users.map((u) => (
                <Image
                  key={u.id}
                  width={41}
                  height={41}
                  src={u.img}
                  alt={`${siteDetails.sub}'s User: ${u.id}`}
                  className="hover:scale-110 transition-all duration-150"
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Home