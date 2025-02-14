import Image from "next/image";
import profile_picture from '../../public/profile_picture.jpeg';
import Link from "next/link";
import { CircleDollarSign, Headset, LogOut, Settings, User } from "lucide-react";
import { logout } from "@/actions/actions";
export default function NavbarUserMenu({name, email}:{name:string, email:string, userImage:string}) {
  
    return (
        <div className="absolute box-border p-[5px] w-[200px] bg-[#F6F5F2] right-[80px] top-[95px] shadow-[0px_0px_2px_1px_#33333333] rounded-[7px] z-[1]">
        <div className="flex box-border p-[7px] items-center bg-[#E8E8E8] rounded-[5px] mb-[10px] border border-[#EEEEEE]">
          <Image className="rounded-[50%]" alt="profile_picture" src={profile_picture} width={35} height={35}/>
          <div className="flex flex-col text-[#555] ml-2">
            <h5 className="p-0 m-0 inline-block text-xs font-medium">{name} </h5>
            <p className="p-0 m-0 inline-block text-[10px] font-light">{email}</p>
          </div>      
        </div>

        <NavbarUserMenuOption title="Account settings" icon={<User color="#555" strokeWidth="1.5px" size={16}/>} link="/user/profile"/>
        <NavbarUserMenuOption title="Payments" icon={<CircleDollarSign color="#555" strokeWidth="1.5px" size={16}/>} link="/profile"/>
        <hr className="bg-[#E8E8E8] border-0 h-[1px] m-0 mb-[5px]"/>
        <NavbarUserMenuOption title="Settings" icon={<Settings color="#555" strokeWidth="1.5px" size={16}/>} link="/profile"/>
        <NavbarUserMenuOption title="Support" icon={<Headset color="#555" strokeWidth="1.5px" size={16}/>} link="/profile"/>

        <hr className="bg-[#E8E8E8] border-0 h-[1px] m-0 mb-[5px]"/>
        <div className="flex items-center box-border px-[10px] py-[5px] rounded-[5px] mb-[5px] hover:cursor-pointer hover:bg-[#EEEEEE]" onClick={logout}>
          <LogOut color="#555" strokeWidth="1.5px" size={16}/>
          <p className="m-0 ml-[5px] font-light text-[#555] text-[13px]">Log out</p>
        </div>
      </div>
    );
}

export function NavbarUserMenuOption({title, icon, link}:{title:string, icon:React.ReactNode, link:string}) {
    return (
      <Link href={link} className="decoration-0 colo">
        <div className="flex items-center box-border px-[10px] py-[5px] rounded-[5px] mb-[5px] hover:cursor-pointer hover:bg-[#EEEEEE]">
          {icon}
          <p className="m-0 ml-[5px] font-light text-[#555] text-[13px]">{title}</p>
        </div>
      </Link>
    );
}
