'use client'
import { useBusinessCalendarNavigationStore } from "@/lib/store"
import { cn } from "@/utils"

export default function CalendarTypeBar() {
  const openCalendarType = useBusinessCalendarNavigationStore(store => store.openCalendarType)
  const setOpenCalendar = useBusinessCalendarNavigationStore(store => store.setOpenCalendar)

  return (
    <div className="flex bg-[#F6F5F2] border-1 border-[#EEE] rounded-md w-[158px] p-0.5">
      <p 
        onClick={()=>setOpenCalendar("week")} 
        className={cn("m-0 w-[78px] py-1 font-medium rounded-sm text-center border-1 border-[#F6F5F2] hover:cursor-pointer", openCalendarType == "week" ? "bg-[#E8E8E8] border-[#D4D4D4]" : "")}
        >
          Week
        </p>
       <p 
        onClick={()=>setOpenCalendar("day")} 
        className={cn("m-0 w-[78px] py-1 font-medium rounded-sm text-center border-1 border-[#F6F5F2] hover:cursor-pointer", openCalendarType == "day" ? "bg-[#E8E8E8] border-1 border-[#D4D4D4]" : "")}
        >
          Day
        </p>
    </div>
  );
}