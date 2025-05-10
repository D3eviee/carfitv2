import Image from "next/image";
import profile_picture from '../../../public/default_user_image.png';
import { Book, Headset, LogOut, User } from "lucide-react";
import { logout } from "@/lib/auth";
import { NavbarProfileDropdownOption } from "./navbar-profile-dropdown-option";

// this component is d

export default function NavbarProfileDropdown({name, phone, image, role, category}:NavbarProfileProps) {
  return (
    <div className="absolute box-border p-[5px] min-w-[200px] max-w-[250px] bg-[#F6F5F2] right-[80px] top-[95px] shadow-[0px_0px_2px_1px_#33333333] rounded-[7px] z-[1]">
      <div className="flex box-border p-[7px] items-center bg-[#E8E8E8] rounded-[5px] mb-[10px] border border-[#EEEEEE]">
        {!image ?
         <Image src={profile_picture} width={35} height={35} alt="profile_pic"  className=" w-9 h-9 rounded-[50%] mr-4 shadow-[0px_0px_3px_1px_#00000030]" />
         :
         <Image src={image} width={35} height={35} alt="profile_pic"  className=" w-9 h-9 rounded-[50%] mr-4 shadow-[0px_0px_3px_1px_#00000030]" />
        }
        <div className="flex flex-col text-[#555] ml-2">
          <h5 className="p-0 m-0 inline-block text-sm font-medium">{name} </h5>
          {phone && <p className="p-0 m-0 inline-block text-xs font-light tracking-wide">{phone}</p>} 
          {category && <p className="p-0 m-0 inline-block text-xs font-light tracking-wide">{category}</p>} 
        </div>      
      </div>

        {role == "CLIENT" && 
          <>
          <NavbarProfileDropdownOption title="Appointments" icon={<Book color="#555" strokeWidth="1.5px" size={16}/>} link="/user/appointments"/>
          <hr className="bg-[#E8E8E8] border-0 h-[1px] m-0 mb-[5px]"/>
        </>}
        
        <NavbarProfileDropdownOption title="Profile" icon={<User color="#555" strokeWidth="1.5px" size={16}/>} link="/user/profile"/>
        
        <NavbarProfileDropdownOption title="Support" icon={<Headset color="#555" strokeWidth="1.5px" size={16}/>} link="/support"/>
        <hr className="bg-[#E8E8E8] border-0 h-[1px] m-0 mb-[5px]"/>

        <div className="flex items-center box-border px-[10px] py-[5px] rounded-[5px] mb-[5px] hover:cursor-pointer hover:bg-[#EEEEEE]" onClick={logout}>
          <LogOut color="#555" strokeWidth="1.5px" size={16}/>
          <p className="m-0 ml-[5px] font-light text-[#555] text-[13px]">Log out</p>
        </div>
      </div>
    );
}

