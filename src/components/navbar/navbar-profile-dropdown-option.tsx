import Link from "next/link";

export function NavbarProfileDropdownOption({title, icon, link}:{title:string, icon:React.ReactNode, link:string}) {
    return (
      <Link href={link} className="decoration-0 colo">
        <div className="flex items-center box-border px-[10px] py-[5px] rounded-[5px] mb-[5px] hover:cursor-pointer hover:bg-[#EEEEEE]">
          {icon}
          <p className="m-0 ml-[5px] font-light text-[#555] text-[13px]">{title}</p>
        </div>
      </Link>
    );
}
