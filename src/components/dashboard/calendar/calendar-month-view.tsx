'use client'
import {addMonths, eachDayOfInterval, format,getDate,getDaysInMonth,getISODay,getMonth,getYear ,isSameDay,isToday,lastDayOfMonth, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";
import { useBusinessCalendarNavigationStore, useBusinessSmallCallendarStore } from "@/lib/store";

export default function CalendarMonthView() {
  const setOpenCalendar = useBusinessCalendarNavigationStore(store => store.setOpenCalendar)

  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)
  const setActiveDay = useBusinessSmallCallendarStore(store => store.setActiveDay)

  const activeMonth = getMonth(activeDay)
  const activeYear = getYear(activeDay)

  const daysInActiveMonth = getDaysInMonth(activeDay)
  const firstDayOfActiveMonth = getISODay(new Date(activeYear, activeMonth, 1 ))
  const lastDayOfTheActiveMonth = getISODay(lastDayOfMonth(activeDay))

  const numberOfDaysInPreviousMonth = getDate(lastDayOfMonth(subMonths(activeDay, 1)))

  const daysOfActiveMonth = eachDayOfInterval({
    start: new Date(activeYear, activeMonth, 1),
    end: new Date(activeYear, activeMonth, daysInActiveMonth)
  })

  const handleNextMonth = () => {
      setActiveDay(addMonths(activeDay, 1))
  }

  const handlePreviousMonth = () => {
    setActiveDay(subMonths(activeDay, 1))
  }

  const handleChoosingDay = (day:Date) => {
    setActiveDay(day)
    setOpenCalendar("day")
  }

  const weekdays= ["Mon", "Tue", "Wed", "Thu","Fri", "Sat" ,"Sun"]

  return (
    <div className="">
      <div className="w-full shadow-[0px_0px_0px_1px_5px_#CCCCCC30] rounded-xl  border">
        {/* CALENDAR NAVIGATION */}
        <div className="w-full flex items-center justify-between p-5">
          <h3>{`${format(activeDay, "MMMM")} ${format(activeDay, "y")}`}</h3>
          <div className="flex flex-row gap-2">
            <button 
              className="p-0.5 bg-[#000] rounded-md border-1 border-[#E8E8E8] hover:bg-[#222]" 
              onClick={handlePreviousMonth}
            >
              <ChevronLeft color="#FFF" size={22} strokeWidth={2} className="pr-0.5"/>
            </button>
            <button 
              className="p-0.5 bg-[#000] rounded-md border-1 border-[#E8E8E8] flex justify-center items-baseline hover:bg-[#222]" 
              onClick={handleNextMonth}
              >
              <ChevronRight color="#FFF" size={22} strokeWidth={2} className="pl-0.5"/>
            </button>
          </div> 
        </div>

        <div className="">
            {/* HEADINGS */}
            <div className="w-full flex items-center justify-evenly py-3">
              {weekdays.map((item, _) => (
                <div key={item} className="w-full flex justify-center">
                  <div className="text-center text-[#333] font-normal text-sm">{item}</div>
                </div>
              ))}
            </div>

            <div className="w-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] min-h-[256px]">
              {Array.from({ length: firstDayOfActiveMonth- 1 }, (_, i) => i + 1).map((_ ,i) => (
                <div key={i} className="h-10 flex justify-center items-center">
                  <div className="flex justify-center  items-center w-8 h-8 text-[#999]">{numberOfDaysInPreviousMonth-i}</div>
                </div>
              )).reverse()}
            
              {daysOfActiveMonth.map((day, index) => {
                return (
                  <div key={index} className="flex flex-col justify-center items-center h-10">
                    <div 
                      className={cn("flex justify-center items-center w-8 h-8 text-[#333] rounded-md hover:cursor-pointer", 
                      isToday(day) ? "border border-[#333] font-semibold" : "", 
                      isSameDay(activeDay, day) ? "bg-[#F25287] border-nonne text-white font-semibold" : "", 
                      )}
                      onClick={() => handleChoosingDay(day)}
                    >
                      {getDate(day)}
                    </div>
                    <div className="flex flex-col gap-1">
                    </div>
                  </div>
                )
              })}
            
              {Array.from({ length: 7 - lastDayOfTheActiveMonth}, (_, i) => i + 1).map((_ ,i) => (
                <div key={i} className="flex items-center justify-center h-10 p-1.5 mb-3">
                 <div className="flex justify-center items-center w-8 h-8 text-[#999]">{i+1}</div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
