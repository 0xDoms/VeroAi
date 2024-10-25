import { ReactNode } from "react"
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";

import { ThemeProvider } from 'next-themes';


export default async function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class">
            <main className="flex flex-col h-screen">
                <NavBar/>

                <div className="flex flex-grow">
                    {/* Sidebar */}
                    <SideBar/>
                    

                    {/* Main content area */}
                    <main className="w-10/12 flex-grow">
                        {children}
                    </main>
                </div>
            </main>
        </ThemeProvider>
    )
}