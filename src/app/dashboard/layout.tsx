import { ReactNode } from "react"
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";


export default async function DashboardLayout({ children }: { children: ReactNode }) {
    return (
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
    )
}