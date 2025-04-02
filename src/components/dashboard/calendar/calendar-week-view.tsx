'use client'
import {addDays, eachDayOfInterval, eachHourOfInterval, format,isSameDay,lastDayOfISOWeek,set, startOfISOWeek, subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsForWeekInterval } from "@/app/dashboard/actions";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CalendarWeekViewEvent from "./calendar-week-view-event";

export default function CalendarWeekView() {
  const date = new Date();

  const [currentWeek, setCurrentWeek] = useState(eachDayOfInterval({
    start: startOfISOWeek(date),
    end: lastDayOfISOWeek(date),
  }))

  const { data } = useQuery({
    queryKey:['getAppointments', currentWeek],
    queryFn: async () => {
      return await getAppointmentsForWeekInterval(currentWeek);
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


  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => {
      const newStartDate = addDays(prevWeek[0], 7);
      return eachDayOfInterval({
        start: newStartDate,
        end: addDays(newStartDate, 6),
      });
    })
  }

  const handlePreviousWeek = () => {
    setCurrentWeek((prevWeek) => {
      const newStartDate = subDays(prevWeek[0], 7);
      return eachDayOfInterval({
        start: newStartDate,
        end: addDays(newStartDate, 6),
      });
    })
  }
  
  return (
    <div className="w-[1100px]">
      <div className="w-full shadow-[0px_0px_0px_1px_5px_#CCCCCC30] rounded-2xl  border">
        {/* CALENDAR NAVIGATION */}
        <div className="relative flex items-center gap-3 p-5">
          <button 
            className="p-0.5 bg-[#000] rounded-[99%] border-1 border-[#E8E8E8] hover:bg-[#222]" 
            onClick={handlePreviousWeek}
            >
              <ChevronLeft color="#FFF" size={22} strokeWidth={2} className="pr-0.5"/>
          </button>
          <button 
            className="p-0.5 bg-[#000] rounded-[99%] border-1 border-[#E8E8E8] flex justify-center items-baseline hover:bg-[#222]" 
            onClick={handleNextWeek}>
              <ChevronRight color="#FFF" size={22} strokeWidth={2} className="pl-0.5"/>
          </button>
          <h3>{`${format(currentWeek[3], "MMMM")} ${format(currentWeek[3], "y")}`}</h3> 
        </div>

        <div>
          {/* HEADINGS */}
          <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] w-full py-3 items-center justify-evenly">
            <p className="text-center rounded border-black">TIME</p>
            {currentWeek.map((item, i) => (
              <div
                key={i}
                className="w-full flex justify-center"
              >
                <div className="bg-[#F2F4F8] w-[95%] text-center rounded-md text-black font-medium">{`${format(item, "iii")}, ${format(item, "d")}`}</div>
              </div>
            ))}
          </div>

          <div className="relative h-[560px] overflow-scroll">
            <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] min-h-full">
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
              {currentWeek.map((day, index) => (
                <div key={index} className="relative flex flex-col">
                  {hours.map((_, i) => (
                    <div key={i} className=" border h-20"></div>
                  ))}
                  {data?.map((item, i)=>(
                    isSameDay(day, item.reservationStart) && <CalendarWeekViewEvent event={item} key={i}/>
                ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


