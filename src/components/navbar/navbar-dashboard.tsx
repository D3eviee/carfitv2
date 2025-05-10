import Link from "next/link";
import NavbarProfileMenu from "./navbar-profile";
import { getNavbarUserData } from "@/actions/actions";

export default async function NavbarDashboard(){
    const serviceNavigationData = await getNavbarUserData()

    return(
        <nav className="top-0 h-[70px] w-full bg-white fixed flex flex-row justify-between items-center px-4 border shadow-[0px_2px_7px_0px_#ACACAC25] z-10">
            <Link href="/"><h3 className="font-semibold text-2xl/7">CarFit</h3></Link>
            <NavbarProfileMenu userData={serviceNavigationData}/>
        </nav>
    )
}
