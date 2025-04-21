import { useCalendarStore } from "@/lib/store";
import { cn } from "@/utils"
import { getDate, getMonth, getYear, isToday } from "date-fns"

export const BookingCalendarDay = ({date}:{date:Date}) => {
    const selecetedDate = useCalendarStore((store) => store.selectedDate)
    const todayDate = useCalendarStore((store) => store.todayDate)
    const setSelectedDate = useCalendarStore((store) => store.setSelectedDate)

    const dateYear = getYear(date)
    const dateMonth = getMonth(date)
    const dateDay =  getDate(date)

    const isDaySelected = () => {
        if(getYear(selecetedDate!) == dateYear && getMonth(selecetedDate!) == dateMonth  &&  getDate(selecetedDate!) == dateDay) return true
        else return false
    }

    const isPast = () => {
        if(getYear(todayDate) >= dateYear && getMonth(todayDate) >= dateMonth && getDate(todayDate) > dateDay) return true
        else return false
    }

    return (
        <div className="flex justify-center text-center py-1 my-1">
            <button className={cn("w-8 h-8 flex items-center justify-center rounded-md text-base text-[#333] font-normal hover:cursor-pointer", 
                isToday(date) ? "border-[0.5px] border-[#333]":"border-none",
                isDaySelected() ? "bg-[#000] text-white": "bg-none",
                isPast() ? "hover:cursor-default line-through" : "no-underline",
            )}
            disabled={isPast()}
            onClick={()=>{setSelectedDate(date)}}
            >
            {getDate(date)}
            </button>
        </div>
    )
}