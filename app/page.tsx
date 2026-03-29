"use client"

import { siteDetails, users } from "@/constants"
import Image from "next/image"
import About from "@/components/About";
import BlogClient from "@/components/BlogClient";
import ContactClient from "@/components/ContactClient";
import { Button } from "@/components/ui/button";

import { IoIosPlay } from "react-icons/io"
import { motion } from "framer-motion"
import Link from "next/link"
import EpisodesClient from "@/components/EpisodesClient";

const Home = () => {
  return (
    <>
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
              className="font-semibold text-white text-[78px] leading-[80px] max-lg:leading-[60px] tracking-[-0.02em] text-center max-w-[841px] mx-auto max-lg:text-[48px] "
            >
              {siteDetails.title}
            </motion.h1>

            {/* Button Animation */}
            <div className="flex items-center gap-7 flex-wrap justify-center">
              <Link href="/episodes" className="flex gap-2 items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button size="lg" className="gap-2 px-6 py-3">
                    Latest episode <IoIosPlay />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/ai" className="flex gap-2 items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button variant="secondary" size="lg" className="gap-2 px-6 py-3">
                    Try AI
                    <span className="text-sm px-1 py-0 rounded border border-primary text-black bg-primary hover:opacity-80">PRO</span>
                  </Button>
                </motion.div>
              </Link>
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

    </>
  )
}

export default Home