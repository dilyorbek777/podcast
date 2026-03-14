"use client";
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
    Twitter,
    Instagram,
    Youtube,
    Check,
    Layers,
    Zap,
    Shield,
    BarChart3
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---


const HeroSection = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 text-center">
            {/* Background Glow Effect */}
            <div
                className="absolute bottom-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 translate-y-1/2 opacity-30 blur-[120px] rounded-full"
                style={{ backgroundColor: '#D97807' }}
            />

            <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">

                {/* New Badge */}
                <div className="mb-8 flex items-center gap-3 rounded-full border border-[#975404]/30 bg-[#975404]/10 px-4 py-1.5 backdrop-blur-md">
                    <span className="rounded-full bg-[#ff9008] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                        New
                    </span>
                    <span className="text-sm font-medium text-[#ff9008]">
                        Latest integration just arrived
                    </span>
                </div>

                {/* Headline */}
                <h1 className="mb-6 bg-gradient-to-b from-white via-white to-[#D97807] bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
                    Boost your <br /> rankings with AI.
                </h1>

                {/* Subheadline */}
                <p className="mb-10 max-w-xl text-lg text-gray-400 md:text-xl">
                    Elevate your site's visibility effortlessly with AI, where
                    smart technology meets user-friendly SEO tools.
                </p>

                {/* CTA Button */}
                <button  className="group relative rounded-lg bg-primary  px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#ff9008] hover:text-white active:scale-95">
                    Start for free
                </button>
            </div>

            {/* Decorative Grid/Radial Line (Optional subtle detail from image) */}
            <div className="absolute inset-0 z-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
                <div className="h-full w-full border-[0.5px] border-[#D97807]/20 rounded-full scale-150" />
            </div>
        </section>
    );
};


const Hero = () => {
    const root = useRef<HTMLElement | null>(null);
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });
        tl.from(".hero-anim", {
            y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
        });
    }, []);

    return (
        <section ref={root} className="relative min-h-[70vh] flex flex-col items-center justify-center bg-[#1a1410] overflow-hidden px-4">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: `linear-gradient(#262626 1px, transparent 1px), linear-gradient(90px, #262626 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            />
            {/* Primary Glow: Changed from Purple to #D97807 (Primary) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D9780733_0%,_transparent_70%)]" />

            <h1 className="hero-anim text-center text-white text-[56px] font-bold leading-[1.1] max-w-3xl z-10">
                AI-driven SEO for everyone.
            </h1>
            <p className="hero-anim text-[#B3B3B3] text-[18px] mt-4 z-10">
                No credit card required · 7-days free trial
            </p>

            <div className="hero-anim flex flex-col md:flex-row gap-4 mt-8 z-10 w-full max-w-[480px]">
                <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 h-[48px] py-4 bg-[#1a1410] border border-[#262626] rounded-sd px-4 text-white placeholder-[#B3B3B3] outline-none focus:border-[#ff9008] transition-colors"
                />
                <button className="h-[48px] px-8 bg-black text-white font-medium uppercase rounded-sd border border-[#262626] hover:shadow-[0_0_24px_0_#D9780733] transition-all">
                    Join waitlist
                </button>
            </div>
        </section>
    );
};

const LogoGrid = () => {
    const logos = ["Acme", "GlobalTech", "Quantum", "Nexus", "Vertex", "Pulse", "Echo", "Orbit"];
    return (
        <section className="bg-[#0A0A0A] py-24 px-8 max-w-[1200px] mx-auto w-full">
            <p className="text-center text-[#B3B3B3] text-[18px] mb-8">Trusted by the world’s most innovative teams</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {logos.map((name, i) => (
                    <div key={i} className="logo-card h-[80px] bg-[#181010] border border-[#262626] rounded-sd flex items-center justify-center gap-3 hover:scale-[1.04] hover:shadow-[0_0_24px_0_#D9780733] transition-all cursor-default">
                        {/* <div className="w-6 h-6 bg-white rounded-sm opacity-20" /> */}
                        <span className="text-white font-bold text-[20px]">{name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Features = () => {
    const features = [
        { title: "Smart Analysis", desc: "Automated insights for your content strategy.", icon: <Zap /> },
        { title: "Keyword Research", desc: "High-volume targets identified by neural networks.", icon: <Layers /> },
        { title: "Safe & Secure", desc: "Enterprise-grade protection for your site data.", icon: <Shield /> },
        { title: "Live Tracking", desc: "Real-time SERP monitoring across all regions.", icon: <BarChart3 /> }
    ];

    return (
        <section className="bg-[#0A0A0A] py-24 px-8 max-w-[1200px] mx-auto">
            <h2 className="text-white text-[40px] font-bold leading-[1.1] text-center mb-14">
                Harness the power of AI, making search engine optimization intuitive and effective for all skill levels.
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {features.map((f, i) => (
                    <div key={i} className="feature-card p-8 bg-[#181010] border border-[#262626] rounded-sd flex flex-col items-start">
                        {/* Icon Background: Primary-400 with low opacity */}
                        <div className="w-20 h-20 bg-[#ff900822] rounded-2xl flex items-center justify-center text-[#ff9008] mb-6">
                            {f.icon}
                        </div>
                        <h3 className="text-white text-[20px] font-bold">{f.title}</h3>
                        <p className="text-[#B3B3B3] text-[16px] mt-2">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Pricing = () => {
    const plans = [
        { name: "Basic", price: "$0", features: ["1 Project", "Basic AI", "Weekly updates"] },
        { name: "Pro", price: "$29", features: ["10 Projects", "Advanced AI", "Daily updates", "Support"], featured: true },
        { name: "Enterprise", price: "$99", features: ["Unlimited", "Custom AI", "Real-time", "Dedicated rep"] }
    ];

    return (
        <section className="bg-[#1a1410] py-24 px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D9780711_0%,_transparent_70%)]" />
            <div className="max-w-[1200px] mx-auto relative z-10">
                <h2 className="text-white text-[40px] font-bold text-center">Pricing</h2>
                <p className="text-[#B3B3B3] text-[18px] text-center mt-2 mb-8">Choose the right plan to meet your SEO needs.</p>



                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((p, i) => (
                        <div key={i} className={`p-10 rounded-sd border border-[#262626] bg-[#110d0a] flex flex-col ${p.featured ? 'shadow-[0_0_24px_0_#D9780733] scale-105' : ''}`}>
                            <h3 className="text-white text-[20px] font-bold">{p.name}</h3>
                            <div className="text-white text-[32px] font-bold mt-2">{p.price}<span className="text-[16px] text-[#B3B3B3] font-normal">/mo</span></div>
                            <ul className="mt-8 space-y-4 flex-1">
                                {p.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-[#B3B3B3] text-[16px]">
                                        <Check size={18} className="text-[#10FFB3]" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-10 w-full h-[48px] bg-black text-white font-medium uppercase rounded-sd border border-[#262626] hover:shadow-[0_0_24px_0_#D9780733] transition-all">
                                Join waitlist
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-[#111111] py-24 px-8 border-t border-[#262626]">
        <div className="max-w-[1200px] w-full mx-auto  gap-12">
            <div className="flex items-center justify-between  w-full">
                <div className="flex items-center gap-2 mb-6">
                    <Image className="w-[53px] h-[53px] max-md:w-[36px] max-md:h-[36px]"
                        width={150} height={40}
                        src={'/logo.png'}
                        alt="Podcast IO" />
                    <span className="font-bold text-[20px] text-white">uPodcast AI </span>
                </div>
                <div className="flex gap-6 ">
                    <Link href={'https://www.threads.com/@asfandiyoroff'}>
                        <Twitter className="text-white w-8 h-8 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />

                    </Link>
                    <Link href={'https://www.instagram.com/asfandiyoroff/'}>
                        <Instagram className="text-white w-8 h-8 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    </Link>
                    <Link href={'https://www.youtube.com/@dilyorbek_ideas'}>
                        <Youtube className="text-white w-8 h-8 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
                    </Link>
                </div>
            </div>

        </div>
    </footer>
);

export default function AIContent() {
    return (
        <div className="bg-[#0A0A0A] min-h-screen selection:bg-[#D97807] selection:text-white">
            <main>
                <HeroSection />
                <LogoGrid />
                <Features />
                <Hero />
                <Pricing />
            </main>
            <Footer />
        </div>
    );
}