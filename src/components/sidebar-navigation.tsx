import { Book, Calendar, ChartBar, Handshake, Home, Settings, Users, Wrench } from "lucide-react"
import Link from "next/link"


export const SidebarNavigation = async () => {

    return (
    <aside className="h-svh fixed w-[70px] top-[70px] p-0 m-0 flex flex-col gap-[30px] bg-[#252525] items-center pt-[30px] shadow-[1px_0px_2px_0px_#8C8C8C]">
      <Link href="/dashboard" >
        <div className={"w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] :bg-[#F25287]"}>
          <Home size={25} color="#FFFFFF"/>
        </div>
      </Link>
      <div className="w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] active:bg-[#F25287]">
        <Calendar size={24} color="#FFFFFF"/>
      </div>
      <div className="w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] active:bg-[#F25287]">
        <Book size={23} color="#FFFFFF"/>
      </div>
      <Link href="/dashboard/services">
        <div className="w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] active:bg-[#F25287]">
          <Wrench size={23} color="#FFFFFF"/>
        </div>
      </Link>
      <div className="w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] active:bg-[#F25287]">
        <Users size={26} color="#FFFFFF"/>
      </div>
      <div className="w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] active:bg-[#F25287]">
        <Handshake size={26} color="#FFFFFF"/>
      </div>
      <div className="w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] active:bg-[#F25287]">
        <ChartBar size={24} color="#FFFFFF"/>
      </div>
      <Link href="/dashboard/settings?tab=details">
        <div className={"w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px]"}>
        <Settings size={27} color="#FFFFFF"/>
        </div>
      </Link>
    </aside>
    )
}