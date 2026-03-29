"use client"

import { siteDetails, users } from "@/constants"
import Image from "next/image"
import About from "@/components/About";
import BlogClient from "@/components/BlogClient";
import ContactClient from "@/components/ContactClient";
import { Button } from "@/components/ui/button";

import { IoIosPlay, IoMdMic, IoMdStar, IoMdPeople } from "react-icons/io"
import { motion } from "framer-motion"
import Link from "next/link"
import EpisodesClient from "@/components/EpisodesClient";
import { useState } from "react"

const Home = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Successfully subscribed!")
        setEmail("")
      } else {
        setMessage(data.error || "Something went wrong")
      }
    } catch (error) {
      setMessage("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-background py-20">



      {/* Hero Section */}
      <section className="max-w-[1720px] py-8 px-4 sm:px-6 lg:px-8 xl:px-16 mx-auto">
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 items-center min-h-[60vh] lg:h-[60vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {siteDetails.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Conversations that inspire, educate, and transform. Join us weekly for insights from industry leaders and innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/episodes">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <IoIosPlay /> Latest Episode
                </Button>
              </Link>
              <Link href="/ai">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  <IoMdStar /> Try AI
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md lg:max-w-none">
              <Image
                src="/podcast.jpg"
                alt="Podcast"
                width={500}
                height={500}
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Listen With Us</h2>
            <p className="text-lg text-muted-foreground">Discover what makes our podcast unique</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 bg-card rounded-xl shadow-xl shadow-primary border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoMdMic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guests</h3>
              <p className="text-muted-foreground">Industry leaders sharing valuable insights and experiences</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 bg-card rounded-xl shadow-xl shadow-primary border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoMdStar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Get personalized recommendations and AI-generated summaries</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-6 bg-card rounded-xl shadow-xl shadow-primary border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoMdPeople className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">Growing Community</h3>
              <p className="text-muted-foreground">Join thousands of listeners worldwide</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Episodes Preview */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-background backdrop-blur-md"></div>
        <div className="w-full h-[50vh] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2   blur-[200px] bg-gradient-to-br from-primary-700 to-secondary mb-10" />

        <section className="pt-16 relative z-10">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center -mb-10">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Recent Episodes</h2>
                <p className="text-lg text-muted-foreground">Catch up on the latest conversations</p>
              </div>
              <Link href="/episodes">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <EpisodesClient />
          </div>
        </section>

        <ContactClient />
      </div>

      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8">From great minds that inspire</p>
          <div className="flex justify-center items-center gap-2">
            {users.map((u, index) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Image
                  width={48}
                  height={48}
                  src={u.img}
                  alt={`${siteDetails.sub}'s User: ${u.id}`}
                  className="rounded-full border-4 border-background shadow-lg hover:scale-110 transition-all duration-150"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Button size="lg">Start Listening</Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Never Miss an Episode</h2>
          <p className="text-lg text-muted-foreground mb-8">Subscribe to get the latest episodes delivered to your inbox</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
            {message && (
              <p className={`text-sm ${message.includes("Successfully") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

    </div>
  )
}

export default Home