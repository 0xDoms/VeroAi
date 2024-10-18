'use client'
import { ReactNode } from "react"
import { LayoutDashboard,MessageSquareText,SlidersHorizontal,Mails } from 'lucide-react';
import NavButton from '@/components/global/NavButton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ToggleModes from "@/components/global/ToggleMode";


export default async function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <main className="flex flex-col h-screen">
            <div className="w-full h-14 flex items-center justify-between border-b-2">
            <span className="w-2/12 h-full flex items-center ml-5 font-bold text-xl">Vero <span className="text-orange-500 ml-1">Ai</span></span>

                <div className="flex items-center justify-between space-x-5 mr-5">
                    <ToggleModes/>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="flex flex-grow">
                {/* Sidebar */}
                <div className="w-2/12 min-w-28 lg:min-w-60 flex flex-col p-4 space-y-3 border-r-2">
                    <h1>Main</h1>
                    <NavButton to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                    <NavButton to="/dashboard/conversations" icon={MessageSquareText} label="Conversations" />
                    <NavButton to="/dashboard/other" icon={SlidersHorizontal} label="Integration" />
                    <NavButton to="/dashboard/other" icon={Mails} label="Email Marketing" />
                </div>

                {/* Main content area */}
                <main className="bg-red-500 w-10/12 flex-grow">
                    {children}
                </main>
            </div>
        </main>
    )
}