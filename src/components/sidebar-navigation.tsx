'use client'
import { cn } from "@/utils"
import { Book, Calendar, ChartBar, Home, Settings, Wrench } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const SidebarNavigation = () => {
  const path = usePathname()
  const activePath = path.slice(11, path.length)

    return (
    <aside className="h-svh fixed w-[70px] top-[70px] p-0 m-0 flex flex-col gap-[30px] bg-[#252525] items-center pt-[30px] shadow-[1px_0px_2px_0px_#8C8C8C]">
      <Link href="/dashboard">
        <div className={cn("w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] :bg-[#F25287]", path == "/dashboard" ? "bg-[#F25287] hover:bg-[#F25287]" : "")}>
          <Home size={25} color="#FFFFFF"/>
        </div>
      </Link>
      <Link href="/dashboard/calendar">
      <div className={cn("w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] :bg-[#F25287]", activePath == "calendar" ? "bg-[#F25287] hover:bg-[#F25287]" : "")}>
          <Calendar size={24} color="#FFFFFF"/>
        </div>
      </Link>
      <Link href="/dashboard/appointments">
      <div className={cn("w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] :bg-[#F25287]", activePath == "appointments" ? "bg-[#F25287] hover:bg-[#F25287]" : "")}>
          <Book size={23} color="#FFFFFF"/>
        </div>
      </Link>
      <Link href="/dashboard/services"  >
      <div className={cn("w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] :bg-[#F25287]", activePath == "services" ? "bg-[#F25287] hover:bg-[#F25287]" : "")}>
          <Wrench size={23} color="#FFFFFF"/>
        </div>
      </Link>
      {/* <Link href="/dashboard/analytics">
        <div className={cn("w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] :bg-[#F25287]", activePath == "analytics" ? "bg-[#F25287] hover:bg-[#F25287]" : "")}>
          <ChartBar size={24} color="#FFFFFF"/>
        </div>
      </Link> */}
      
      <Link href="/dashboard/settings">
      <div className={cn("w-[40px] h-[40px] flex justify-center items-center box-border rounded-[10px] hover:cursor-pointer hover:bg-[#323232] :bg-[#F25287]",  activePath.startsWith("settings") && "bg-[#F25287] hover:bg-[#F25287]")}>
        <Settings size={27} color="#FFFFFF"/>
        </div>
      </Link>
    </aside>
    )
}