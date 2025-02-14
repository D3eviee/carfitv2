'use client'
import Image from "next/image";
import profile_picture from '../../public/profile_picture.jpeg';
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import NavbarUserMenu from "./navbar-user-menu";

export default function NavbarProfileMenu({name, email, userImage}:{name:string, email:string, userImage:string}) {

  const [openMenu, setOpenMenu] = useState<boolean>(false);
    
  const openMenuHandler = () =>{
    if(openMenu == false){
      setOpenMenu(true);
    }else{
      setOpenMenu(false)
    }
  }

  return (
    <div>
      <div  onClick={()=>{openMenuHandler()}} className="flex items-center justify-center box-border p-[5px] rounded-[7px] hover:cursor-pointer hover:bg-[#E8E8E8]" >
      <Image src={profile_picture} width={35} height={35} alt="profile_pic"  className=" w-9 h-9 rounded-[50%] mr-4 shadow-[0px_0px_3px_1px_#00000030]" />
      <p className="p-0 m-0 mr-[3px] text-sm font-normal color-[#333333]">{name}</p>
      <ChevronDown  className="mt-[1px]" color="#333333" size={20} strokeWidth={2}/>
    </div>
      
      {openMenu ? 
        <>
        <div className="absolute w-screen h-screen left-0 top-0" onClick={()=>{openMenuHandler()}}/>
          <NavbarUserMenu name={name} email={email} userImage={userImage}/>
        </>
      : <></>}
    </div>
  );
}

