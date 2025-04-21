'use client'
import { getServiceIdFromParams } from "@/utils"
import { BookingEventTimeItem } from "./booking-event-time-item"
import { getCategoriesDataForService, getWorkingTimeData } from "@/actions/actions"
import { useAppointmentStore, useCalendarStore } from "@/lib/store"
import { addMinutes, eachMinuteOfInterval, format, set, } from "date-fns"
import { useQuery } from "@tanstack/react-query"

export const BookingEventTime = ({reservations}) => {
    const serviceId = getServiceIdFromParams()
    const selecetedDate = useCalendarStore((store) => store.selectedDate)
    const selectedServices = useAppointmentStore((store) => store.selectedServices)
    const selectedDateDayOfWeek = format(selecetedDate!, "EEEE")

    const { data: servicesData} = useQuery({
        queryKey: ["dataForBooking"],
        queryFn: async () => {
          const categoriesData = await getCategoriesDataForService(serviceId);   
          return categoriesData
        },
    });

    const services = servicesData?.map((item, _) =>{
    return item.services
    }).flat()

    const selectedServicesTotalDuration = services?.reduce((sum, item) => {
        return selectedServices.includes(item.id)
            ? sum + Number(item.duration)
            : sum
    }, 0) || 0;


    const { data, status } = useQuery({
        queryKey: ["getWorkingHours"],
        queryFn: async () => {
          const workingTimeData = await getWorkingTimeData(serviceId)
          return workingTimeData
        },
    });

    if(status == "pending") return <>PENDING</>
    if(status == "error") return <>ERROR</>
    

    const activeDayOpeningData = data?.find((item) => item.dayOfWeek == selectedDateDayOfWeek)
    const [serviceOpeningHour, serviceOpeningMinutes] = activeDayOpeningData!.open?.split(":")
    const [serviceClosingHour, serviceClosingMinutes] = activeDayOpeningData!.close?.split(":")
    const openingServiceTime = set(new Date(selecetedDate!), { hours: Number(serviceOpeningHour), minutes: Number(serviceOpeningMinutes), seconds: 0})
    const closingServiceTime = set(new Date(selecetedDate!), { hours: Number(serviceClosingHour), minutes: Number(serviceClosingMinutes), seconds: 0 })

    const hours = eachMinuteOfInterval({start: openingServiceTime, end: closingServiceTime}, {step:15})


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
                            const serviceDuration = selectedServicesTotalDuration
                            const serviceEnd = addMinutes(time, serviceDuration)

                            const isBetween = reservations.some((item) =>
                                  (time < item.reservationEnd && serviceEnd > item.reservationStart)
                            )

                            if(isBetween) return null

                            const afterWorkingHours = addMinutes(time, serviceDuration) > closingServiceTime

                            if(afterWorkingHours) return <p>Brak terminów. Sprawdź inne dni.</p>

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