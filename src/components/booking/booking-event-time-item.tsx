import { useEventTimeStore } from "@/lib/store"
import { cn } from "@/utils"
import { getHours, getMinutes, isEqual } from "date-fns"

export const BookingEventTimeItem = ({time}:{time:Date}) => {
    const hours = getHours(time)
    const minutes = getMinutes(time)

    const activeEventTime = useEventTimeStore((store) => store.activeEventTime)
    const setActiveEventTime = useEventTimeStore((store) => store.setActiveEventTime)

    const handleChoosingTime = () => {
        setActiveEventTime(time)
    }

    return (
        <p 
            className={cn("h-fit text-center text-base text-[#111] font-medium py-1.5 rounded-md border-[0.5px] hover:cursor-pointer",
                isEqual(activeEventTime!, time) ? "bg-[#222] text-white" : "bg-[#F2F4F8] hover:bg-[#EEE]"
            )}
            onClick={handleChoosingTime}
        >
            {`${hours}:${minutes == 0 ? minutes + "0" : minutes }`}
        </p>
    )
}