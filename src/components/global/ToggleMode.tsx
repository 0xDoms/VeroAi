'use client'
import { MenuIcon,Sun,Moon } from 'lucide-react'
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';
import {
Menubar,
MenubarContent,
MenubarItem,
MenubarMenu,
MenubarTrigger,
} from "@/components/ui/menubar"


const ToggleModes = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Return null or a placeholder while waiting for the client-side theme to load
    if (!mounted) {
        return null;
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <main>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        {currentTheme === "dark" ? <Moon /> : <Sun />}
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={() => setTheme('system')}>System</MenubarItem>
                        <MenubarItem onClick={() => setTheme('light')}>Light</MenubarItem>
                        <MenubarItem onClick={() => setTheme('dark')}>Dark</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar> 
        </main>
    );
}

export default ToggleModes