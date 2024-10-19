'use client'
import { LayoutDashboard,MessageSquareText,SlidersHorizontal,Mails } from 'lucide-react';
import NavButton from '@/components/global/NavButton';

const SideBar = () => {

    return (
        <main>
            <div className="w-2/12 min-w-28 lg:min-w-60 flex flex-col p-4 space-y-3 border-r-2 bg-background h-full">
                <h1>Main</h1>
                <NavButton to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                <NavButton to="/dashboard/conversations" icon={MessageSquareText} label="Conversations" />
                <NavButton to="/dashboard/other" icon={SlidersHorizontal} label="Integration" />
                <NavButton to="/dashboard/other" icon={Mails} label="Email Marketing" />
            </div>
        </main>
    );
}

export default SideBar