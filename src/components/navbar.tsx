import { userAuth } from "@/lib/session";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./logout-button";

export default async function  Navbar(){
    const user = await userAuth()

    return(
        <nav className="flex flex-row justify-between items-center px-20 pt-11">
            
            <h3 className="font-semibold text-2xl/7">CarFit</h3>

            {user ? <div className="flex gap-4 justify-center items-center">
                <p>{user.email}</p>
                <LogoutButton/>
            </div> :<Link href="/sign-in">
                <button className="px-[15px] py-[9px] text-white bg-black font-semibold rounded-[5px] text-sm hover:bg-[#333333]">Log in</button>
            </Link> }
        </nav>
    )
}
