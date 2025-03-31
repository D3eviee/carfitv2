'use client'
import { getServiceIdFromParams } from "@/utils"
import { BookingEventTimeItem } from "./booking-event-time-item"
import { getWorkingTimeData } from "@/actions/actions"
import { useCalendarStore } from "@/lib/store"
import { addMinutes, eachMinuteOfInterval, format, set, } from "date-fns"
import { useQuery } from "@tanstack/react-query"

export const BookingEventTime = ({reservations}) => {
    const serviceId = getServiceIdFromParams()
    const selecetedDate = useCalendarStore((store) => store.selectedDate)
    const selectedDateDayOfWeek = format(selecetedDate!, "EEEE")

    const { data } = useQuery({
        queryKey: ["getWorkingHours"],
        queryFn: async () => {
          const workingTimeData = await getWorkingTimeData(serviceId)
          return workingTimeData
        },
    });

    const activeDayOpeningData = data?.find((item) => item.dayOfWeek == selectedDateDayOfWeek)

    let hours: Date []

    if(activeDayOpeningData && selecetedDate){
        const [serviceOpeningHour, serviceOpeningMinutes] = activeDayOpeningData!.open?.split(":")
        const [serviceClosingHour, serviceClosingMinutes] = activeDayOpeningData!.close?.split(":")
        const openingServiceTime = set(new Date(selecetedDate), { hours: Number(serviceOpeningHour), minutes: Number(serviceOpeningMinutes), seconds: 0})
        const closingServiceTime = set(new Date(selecetedDate), { hours: Number(serviceClosingHour), minutes: Number(serviceClosingMinutes), seconds: 0 })
    
        hours = eachMinuteOfInterval({start: openingServiceTime, end: closingServiceTime}, {step:15})
    }

    return (
        <div className="flex flex-col gap-7 mb-14">
            {activeDayOpeningData?.isOpen ? (
                <div className="grid grid-cols-7 gap-4 h-48 overflow-scroll">
                    {hours.map((time, index) => {
                        const isReserved = reservations.some(
                            (item) => time >= item.reservationStart && time < item.reservationEnd
                        );
    
                        if (isReserved) return null;
                        else {
                            const serviceDuration = 75
                            const serviceEnd = addMinutes(time, serviceDuration)
                            
                            const isBetween = reservations.some(
                                (item) => serviceEnd >= item.reservationStart && serviceEnd < item.reservationEnd
                            )

                            if(isBetween) return null
                            else return <BookingEventTimeItem time={time} key={index}/>
                        }
                    })}
                </div>
            ) : (
                <p className="text-center font-normal">Closed on this day</p>
            )}
        </div>
    );
}