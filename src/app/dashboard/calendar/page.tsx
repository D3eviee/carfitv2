import CalendarActiveTaskView from "@/components/dashboard/calendar/calendar-active-task-view";
import CalendarMain from "@/components/dashboard/calendar/calendar-main";
import CalendarMonthView from "@/components/dashboard/calendar/calendar-month-view";

export default function Calendar() {
  return (
    <div className="flex flex-row gap-5 mt-[134px] ml-[100px] mr-[70px] overflow-hidden">
      <CalendarMain/>
      <div className="flex flex-col gap-5 mt-16 w-full overflow-hidden">
        <CalendarMonthView/>
        <CalendarActiveTaskView/>
      </div>
   </div>
  )
}