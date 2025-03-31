'use client'
import {addDays, eachDayOfInterval, eachHourOfInterval, format,getHours,getMinutes,isSameDay,lastDayOfISOWeek,set, startOfISOWeek, subDays } from "date-fns";
import CalendarTypeBar from "./calendar-type-bar";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsForInterval } from "@/app/dashboard/actions";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function CalendarMain() {
  const date = new Date();

  const [currentWeek, setCurrentWeek] = useState(eachDayOfInterval({
    start: startOfISOWeek(date),
    end: lastDayOfISOWeek(date),
  }))

  const { data } = useQuery({
    queryKey:['getAppointments', currentWeek],
    queryFn: async () => {
      return await getAppointmentsForInterval(currentWeek);
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

  const displayEvent = (event: {duration: number, reservationStart:Date, clientId: string, charge: string}, key:number) => {
    const startHour =  getHours(event.reservationStart)-6
    const startMinutes = getMinutes(event.reservationStart)

    const blockHeight = Math.round(event.duration * 1.33)

    const top = Math.round((startHour) * 80 + startMinutes * 1.33); 

    return (
      <div 
        key={key}
        className="absolute w-full bg-blue-500 text-white text-sm  rounded-md"
        style={{
          top: `${top}px`,
          height: `${blockHeight}px`,
        }}
      >
        {event.clientId}
      </div>
    );
  }
  
  return (
    <div className="w-[1100px]">
      {/* TOP MENU */}
      <div className="flex flex-row items-center justify-between mb-7">
        <CalendarTypeBar />
        <button className="outline-none p-2 text-sm font-medium text-white bg-[#F25287] rounded-md shadow-[0px_1px_1px_0px_#00000040] hover:cursor-pointer hover:bg-[#F36398]">
          + Add appointment
        </button>
      </div>

      <div className="w-full shadow-[0px_0px_0px_1px_5px_#CCCCCC30] rounded-2xl  border">
        {/* CALENDAR NAVIGATION */}
        <div className="relative flex items-center gap-3 p-5">
          <button 
            className="p-0.5 bg-[#000] rounded-[99%] border-1 border-[#E8E8E8] hover:bg-[#222]" 
            onClick={handlePreviousWeek}
            >
              <ChevronLeft color="#FFF" size={22} strokeWidth={2} className="pr-0.5"/>
            </button>
          <h3>{`${format(currentWeek[6], "MMMM")} ${format(currentWeek[6], "y")}`}</h3>

          <button 
            className="p-0.5 bg-[#000] rounded-[99%] border-1 border-[#E8E8E8] flex justify-center items-baseline hover:bg-[#222]" 
            onClick={handleNextWeek}>
              <ChevronRight color="#FFF" size={22} strokeWidth={2} className="pl-0.5"/>
          </button>
        </div>
        {/* CALENDAR */}

        <div >
          {/* HEADINGS */}
          <div className="flex w-full h-10 items-center justify-evenly">
            <p className="text-center w-20">TIME</p>
            {currentWeek.map((item, i) => (
              <div
                key={i}
                className="block text-center w-[160px]"
              >{`${format(item, "iii")}, ${format(item, "d")}`}</div>
            ))}
          </div>

          <div className="relative h-[540px] overflow-scroll">
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
                    <div key={i} className="border h-20"></div>
                  ))}
                  {data?.map((item, i)=>(
                    isSameDay(day, item.reservationStart) && displayEvent(item, i)
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
