"use client";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAlignJustify, FaXmark } from "react-icons/fa6";

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
                            <a href={link.path} className={` tracking-wider hover:text-primary transition-all ${pathName === link.path ? " text-primary " : ""}`}>{link.name}</a>
                        </li>
                    ))}

                </ul>
                <button className=" text-[16px] px-8 py-3 bg-primary cursor-pointer hover:bg-primary-700 transition-all  font-medium rounded-sd">Sign Up</button>
            </div>

            {btn ? <button onClick={() => setBtn(!btn)} className="text-lg lg:hidden"><FaXmark /></button> : <button onClick={() => setBtn(!btn)} className="text-lg lg:hidden"><FaAlignJustify /></button>}

        </nav>
    )
}

export default Navbar