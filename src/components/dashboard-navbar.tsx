import { serviceAuth } from "@/lib/session";
import Link from "next/link";
import NavbarProfileMenu from "./navigation-profile-menu";

export default async function DashboardNavbar(){
    const service = await serviceAuth()

    return(
        <nav className="top-0 h-[70px] w-full bg-white fixed flex flex-row justify-between items-center px-4 border shadow-[0px_2px_7px_0px_#ACACAC25] z-10">
            <Link href="/"><h3 className="font-semibold text-2xl/7">CarFit</h3></Link>
            <NavbarProfileMenu name={service.name} email={service.email} userImage={service.id}/>
        </nav>
    )
}
