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
        <Link 
            href={to} 
            className={`flex items-center ${isActive ? 'bg-accent text-text font-bold' : 'bg-background text-gray-500'} hover:bg-accent transition-colors rounded-md py-2 px-4`}
        >
            <Icon className={`mr-3`} />
            <span className="hidden lg:block">{label}</span> {/* Text hidden on small screens */}
        </Link>
    );
};

export default NavButton;
