'use client'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

// Define the props interface
interface NavButtonProps {
    to: string;  // The destination URL
    icon: React.ElementType;  // The icon component
    label: string;  // The label for the button
}

// The NavButton component
const NavButton: FC<NavButtonProps> = ({ to, icon: Icon, label }) => {
    const pathname = usePathname();
    const isActive = pathname === to;

    return (
        <Link href={to} className={`flex items-center ${isActive ? 'bg-accent' : 'bg-background'} hover:bg-accent transition-colors rounded-md py-2 px-4`}>
            <Icon className={`mr-3 ${isActive ? 'text-orange-500' : ''}`}/>
            <span className="line">{label}</span> 
        </Link>
    );
};

export default NavButton;
