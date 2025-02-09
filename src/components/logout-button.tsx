'use client'
import { logout } from "@/actions/actions";

export default function  LogoutButton(){

    return(
        <button onClick={async ()=>{ await logout()}} className="px-[15px] py-[9px] text-white bg-black font-semibold rounded-[5px] text-sm hover:bg-[#333333]">Log out</button>
    )
}



