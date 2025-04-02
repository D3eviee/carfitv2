'use client'
import {addDays, eachDayOfInterval, eachHourOfInterval, format,isSameDay,lastDayOfISOWeek,set, startOfISOWeek, subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsForWeekInterval } from "@/app/dashboard/actions";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarWeekViewEvent from "./calendar-week-view-event";
import { useBusinessSmallCallendarStore } from "@/lib/store";

export default function CalendarDayView() {

  const activeDay = useBusinessSmallCallendarStore(store => store.activeDay)
  const setActiveDay = useBusinessSmallCallendarStore(store => store.setActiveDay)

  const [currentDay, setCurrentDay] = useState(eachDayOfInterval({
    start: startOfISOWeek(activeDay),
    end: lastDayOfISOWeek(activeDay),
  }))

  const { data } = useQuery({
    queryKey:['getAppointments', currentDay],
    queryFn: async () => {
      return await getAppointmentsForWeekInterval(currentDay);
    }
  })

  const hours = eachHourOfInterval({
    start: set(new Date(), {
      hours: 6,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).toISOString(),
    end: set(new Date(), {
      hours: 20,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }).toISOString(),
  });


  const handleNextDay = () => {
    setActiveDay(addDays(activeDay, 1))
  }

  const handlePreviousDay = () => {
    setActiveDay(subDays(activeDay, 1))
  }
  
  return (
    <div className="w-[1100px]">
      <div className="w-full shadow-[0px_0px_0px_1px_5px_#CCCCCC30] rounded-2xl  border">
        {/* CALENDAR NAVIGATION */}
        <div className="relative flex items-center gap-3 p-5">
          <button 
            className="p-0.5 bg-[#000] rounded-[99%] border-1 border-[#E8E8E8] hover:bg-[#222]" 
            onClick={handlePreviousDay}
            >
              <ChevronLeft color="#FFF" size={22} strokeWidth={2} className="pr-0.5"/>
          </button>
          <button 
            className="p-0.5 bg-[#000] rounded-[99%] border-1 border-[#E8E8E8] flex justify-center items-baseline hover:bg-[#222]" 
            onClick={handleNextDay}>
              <ChevronRight color="#FFF" size={22} strokeWidth={2} className="pl-0.5"/>
          </button>
          <h3>{`${format(activeDay, "cccc")}, ${format(activeDay, "MMMM")} ${format(activeDay, "d")}`}</h3> 
        </div>

        <div>
          <div className="relative h-[560px] overflow-scroll">
            <div className="grid grid-cols-[1fr_13fr] min-h-full">
              {/* Lewa kolumna z godzinami */}
              <div className="flex flex-col">
                {hours.map((item, i) => (
                  <div
                    key={i}
                    className="border h-20 flex justify-center items-center"
                  >
                    {format(item, "kk")}:00
                  </div>
                ))}
              </div>

              {/* Kolumny dla każdego dnia tygodnia */}
              <div className="relative">
                  {hours.map((_, i) => (
                    <div key={i} className="border h-20"></div>
                  ))}
                  {data?.map((item, i)=>(
                    isSameDay(activeDay, item.reservationStart) && <CalendarWeekViewEvent event={item} key={i}/>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
