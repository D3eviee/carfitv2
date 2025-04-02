'use client'
import CalendarTypeBar from "./calendar-type-bar";
import CalendarWeekView from "./calendar-week-view";
import { useBusinessCalendarNavigationStore } from "@/lib/store";
import CalendarDayView from "./calendar-day-view";

export default function CalendarMain() {
  //ZUSTAND STORE FOR MANAGING TYPE OF CALENDAR
  const openCalendarType = useBusinessCalendarNavigationStore(store => store.openCalendarType)

  return (
    <div className="w-[1100px]">
      {/* TOP MENU */}
      <div className="flex flex-row items-center justify-between mb-7">
        <CalendarTypeBar />
        <button className="outline-none p-2 text-sm font-medium text-white bg-[#F25287] rounded-md shadow-[0px_1px_1px_0px_#00000040] hover:cursor-pointer hover:bg-[#F36398]">
          + Add appointment
        </button>
      </div>

      {openCalendarType == "week" && <CalendarWeekView/>}
      {openCalendarType == "day" && <CalendarDayView/>}
    </div>
  );
}
