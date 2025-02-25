import { serviceAuth, userAuth } from "@/lib/session";
import Link from "next/link";
import NavbarProfileMenu from "./navigation-profile-menu";

export default async function  Navbar(){
    const user = await userAuth()

    return(
        <nav className="relative flex flex-row justify-between items-center px-20 pt-11">
            <Link href="/"><h3 className="font-semibold text-2xl/7">CarFit</h3></Link>

            {user.id  ? <div className="flex gap-4 justify-center items-center">
                <NavbarProfileMenu name={user.name} email={user.email} userImage={user.image}/>
            </div> :
            <div className="flex gap-6">
            <Link href="/business">
                <button className="px-[15px] py-[9px] text-white bg-black font-semibold rounded-[5px] text-sm hover:bg-[#333333]">Business</button>
            </Link> 
            <Link href="/sign-in">
            <button className="px-[15px] py-[9px] text-white bg-black font-semibold rounded-[5px] text-sm hover:bg-[#333333]">Log in</button>
             </Link>
            </div>
             }
        </nav>
    )
}
