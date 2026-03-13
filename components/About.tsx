"use client"
import Image from "next/image"

import { motion } from "framer-motion"
import { about, siteDetails } from "@/constants";
const About = () => {

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
      <div className="max-w-[1720px] mx-auto w-full p-24 max-md:p-4 min-h-screen flex flex-col items-center">
        <h1 className="text-5xl font-bold my-8 max-md:my-16 text-center">About Us</h1>
  
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 items-center max-lg:grid-cols-1 gap-10"
        >
          {about.map((a) => (
            <motion.div key={a.id} variants={itemVariants}>
              <div className="flex flex-col text-xl my-7 gap-3 max-w-[500px]">
                <h3 className="text-primary text-4xl font-bold">{a.title}</h3>
                <p>{a.text}</p>
              </div>
              {a.img && (
                <Image
                  alt={siteDetails.title}
                  src={a.img}
                  width={700}
                  height={400}
                  className="h-[400px] rounded-2xl object-cover  w-full max-w-[700px]"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };
  
  
  export default About