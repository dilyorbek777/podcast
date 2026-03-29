"use client";
import { navLinks } from "@/constants";
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
    const [btn, setBtn] = useState(false);

    const pathName = usePathname()


    return (
        <nav className="flex fixed backdrop-blur-2xl rounded-sd max-md:p-4 z-50 top-3 right-0 left-0 max-w-[1720px] w-full mx-auto items-center justify-between px-24 py-5">
            <Link href={'/'}>
                <Image className="w-[53px] h-[53px] max-md:w-[36px] max-md:h-[36px]"
                    width={150} height={40}
                    src={'/logo.png'}
                    alt="Podcast IO" />
            </Link>
            <div className={`nav-links max-w-[950px] w-full max-[1140px]:max-w-[600px]  flex items-center justify-between ${btn ? 'max-lg:flex bg-black/90 rounded-sd backdrop-blur-3xl absolute top-0 left-0 right-0 bottom-0 flex-col gap-5 h-screen items-center justify-center w-full max-lg:max-w-[768px] -z-10 bg-secondary' : 'max-lg:hidden'}`}>
                <ul className="links  flex gap-[38px] items-center justify-between text-lg  max-lg:text-[15px]  max-lg:flex-col max-lg:gap-5 ">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <a href={link.path} className={` tracking-wider  flex items-center gap-1 justify-center hover:text-primary transition-all ${pathName === link.path ? " text-primary " : "text-black dark:text-white"}`}>{link.name}{link.name === "AI" ? (
                                <span className="text-sm px-1 py-0 rounded-sd border-primary border text-primary hover:opacity-80">beta</span>
                            ) : ""}</a>
                        </li>
                    ))}

                </ul>

                <div className="flex items-center justify-center gap-5">
                    <Show when="signed-out">
                        <Link href={'/sign-in'}>
                            <button className="border border-white backdrop-blur-sm hover:backdrop-blur-2xl font-semibold  text-white 
                            hover:border-primary
                             flex items-center justify-center gap-2 rounded-sd text-lg cursor-pointer text-[16px] px-8 py-3  hover:bg-primary hover:text-white transition-all  ">Sign In</button>

                        </Link>
                        <Link href={'/sign-up'}>
                            <button className=" text-[16px] px-8 py-3 bg-primary cursor-pointer hover:bg-primary-700 transition-all  font-semibold rounded-sd">Sign Up</button>

                        </Link>

                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                    <ThemeToggle />

                </div>
            </div>

            {btn ? <button onClick={() => setBtn(!btn)} className="text-lg lg:hidden"><FaXmark /></button> : <button onClick={() => setBtn(!btn)} className="text-lg lg:hidden"><FaAlignJustify /></button>}


        </nav>
    )
}

export default Navbar