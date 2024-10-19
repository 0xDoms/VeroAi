import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ToggleModes from "@/components/global/ToggleMode";

const NavBar = () => {

    return (
        <main>
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
        </main>
    );
}

export default NavBar