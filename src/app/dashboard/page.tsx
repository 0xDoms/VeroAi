'use client';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { LayoutDashboard,MessageSquareText,SlidersHorizontal,Mails } from 'lucide-react';
import NavButton from '../../components/global/NavButton';

export default async function Dashboard() {

  return (
    <main>
      <div className="w-2/12 h-screen min-w-28 lg:min-w-60 flex flex-col p-4 space-y-3 border border-r-2">

        <h1 className=''>Main</h1>
        <NavButton to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavButton to="/dashboard/other" icon={MessageSquareText} label="Conversations" />
        <NavButton to="/dashboard/other" icon={SlidersHorizontal} label="Integration" />
        <NavButton to="/dashboard/other" icon={Mails} label="Email Marketing" />
      </div>
    </main>
  );
}