'use client'

import { cn } from "@/utils";
import { useState } from "react";

export default function CalendarTypeBar() {

  const [activeElement, setActiveElement] = useState("week")

  return (
    <div className="flex bg-[#F6F5F2] border-1 border-[#EEE] rounded-md w-[158px] p-0.5">
      <p 
        onClick={()=>setActiveElement("week")} 
        className={cn("m-0 w-[78px] py-1 font-medium rounded-sm text-center border-1 border-[#F6F5F2] hover:cursor-pointer", activeElement == "week" ? "bg-[#E8E8E8] border-[#D4D4D4]" : "")}
        >
          Week
        </p>
       <p 
        onClick={()=>setActiveElement("month")} 
        className={cn("m-0 w-[78px] py-1 font-medium rounded-sm text-center border-1 border-[#F6F5F2] hover:cursor-pointer", activeElement == "month" ? "bg-[#E8E8E8] border-1 border-[#D4D4D4]" : "")}
        >
          Month
        </p>
    </div>
  );
}