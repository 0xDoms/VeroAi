'use client'

import Link from 'next/link'
import { MenuIcon,Sun,Moon } from 'lucide-react'
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import { FC } from 'react';

interface NavbarProps {
    user: any | null;  // You can replace `any` with a more specific type if available
}

const Navbar: FC<NavbarProps> = ({ user }) => {
    const { theme, setTheme } = useTheme();
    
    return (
        <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-background backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between text-black dark:text-white">
            <aside className="flex items-center gap-[2px]">
                <p className="text-3xl font-bold">VeroAi</p>
                {/*Place Holder*/}
                <Button variant={"outline"} size={"icon"} onClick={() => setTheme('light')}>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 text-muted-foreground' />
                </Button>
                <Button variant={"outline"} size={"icon"} onClick={() => setTheme("dark")}>
                    <Moon className='absolute h-[1.2rem] w-[1.2rem]  transition-all  dark:scale-100 text-muted-foreground' />
                </Button>
            </aside>
            <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
                <ul className="flex items-center gap-4 list-none">
                <li>
                    <Link href="#">Products</Link>
                </li>
                <li>
                    <Link href="#">Pricing</Link>
                </li>
                <li>
                    <Link href="#">Clients</Link>
                </li>
                <li>
                    <Link href="#">Resources</Link>
                </li>
                <li>
                    <Link href="#">Documentation</Link>
                </li>
                <li>
                    <Link href="#">Enterprise</Link>
                </li>
                </ul>
            </nav>
            <aside className="flex items-center gap-4">
                { user ? (
                    <LoginLink><Button>Dashboard</Button></LoginLink>
                ) : (
                    <RegisterLink><Button>Get Started</Button></RegisterLink>
                )}
            </aside>
        </header>
    );
}

export default Navbar