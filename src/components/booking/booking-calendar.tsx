import { format } from "date-fns"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

export const BookingCalendar = () => {
    const todayDate = new Date()
    const monthName = format(todayDate, "MMMM");
    const year = todayDate.getFullYear()

    return (
        <div className="flex flex-col gap-8">
            {/* CALENDAR HEADING AND CONTROLS */}
            <div className=" flex flex-row justify-between items-center">
                <h1 className="text-black text-xl font-medium tracking-normal">{`${monthName}, ${year}`}</h1> 
                <div className="flex flex-row gap-3">
                    <button className="p-1 bg-black rounded-md hover:bg-[#222]"><ChevronLeft color="#FFF"/></button>
                    <button className="p-1 bg-black rounded-md hover:bg-[#222]"><ChevronRight color="#FFF"/></button>
                </div>
            </div>
                
            {/* CALENDAR */}
            <div className="flex flex-col">
                {/* CALENDAR DAYS */}
                <div className="w-full grid grid-cols-7">
                    <div className="text-center py-1">Mo</div>
                    <div className="text-center py-1">Tu</div>
                    <div className="text-center py-1">We</div>
                    <div className="text-center py-1">Th</div>
                    <div className="text-center py-1">Fr</div>
                    <div className="text-center py-1">Sa</div>
                    <div className="text-center py-1">Su</div>
                </div>

                <div className="w-full grid grid-cols-7">
                    
            
                </div>
            </div>
        </div>
    )
} 