'use client'
import { addNewReservation, getCategoriesDataForService } from "@/actions/actions";
import { BookingSummaryItem } from "@/components/booking-summary-item";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import BookingChoosingServices from "@/components/booking/booking-choosing-services";
import { NavigationCloseBookingButton } from "@/components/navigation-close-booking-button";
import { userAuth } from "@/lib/session";
import { useAppointmentStore, useCalendarStore, useEventTimeStore } from "@/lib/store";
import { cn, getServiceIdFromParams } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addMinutes, format, getHours, getMinutes, getMonth, getYear } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Booking() {
  const router = useRouter()

  const [activeBookingStep, setActiveBookingStep] = useState(1)

  // ZUSTAND STORE FOR SELECTED SERVICES, DATE AND TIME
  const selectedServices = useAppointmentStore((store) => store.selectedServices)
  const resetSelectedServices = useAppointmentStore((store) => store.resetSelectedServices)
  const selectedDate = useCalendarStore(store => store.selectedDate)
  const activeEventTime = useEventTimeStore((store) => store.activeEventTime)
  const setActiveEventTime = useEventTimeStore((store) => store.setActiveEventTime)
  const resetCalendarStore = useCalendarStore((store) => store.resetCalendarStore)

  // extracting ID
  const id = getServiceIdFromParams()
  
  //getting service data
  const { data } = useQuery({
    queryKey: ["dataForBooking"],
    queryFn: async () => {
      const categoriesData = getCategoriesDataForService(id);   
      return categoriesData
    },
  });

  const services = data?.map((item, _) =>{
    return item.services
  }).flat()


  const calculateTotalPrice = () => {
    let total = 0
    services?.map((item) => {
      if(selectedServices.includes(item.id)) total +=  Number(item.price)
    })

    return total
  }

  const calculateDuration = () => { 
    let duration = 0
    
    services?.map((item) => {
      if(selectedServices.includes(item.id)) duration +=  item.duration
    })

    const hours = Math.floor(duration/60)
    const minutes = duration%60

    if(hours == 0) return `(${minutes} min duration)`
    if (minutes==0) return `(${hours} h duration)`
    return `(${hours}h ${minutes} min duration)`
  }

  const moveToNextBookingStep = () => {
    setActiveBookingStep((step) => step + 1);
  }

  const isButtonDisabled = () => {
   if(activeBookingStep == 1){
    if(selectedServices.length==0) return true
    else return false
   }
   else if(activeBookingStep == 2){
    if(selectedDate == null || activeEventTime == null) return true
    else return false
   }
  }

  const mutation = useMutation({
    mutationKey: ["addReservation"],
    mutationFn: async () => {
      try{
        let appointmentDuration = 0
        let appointmentCharge = 0
      
    services?.forEach((item) => {
      if (selectedServices.includes(item.id)) {
        appointmentDuration += item.duration;
        appointmentCharge += parseFloat(item.price);
      }
    });

    console.log(selectedServices)

    const data = {
      businessId: id,
      clientId:  (await userAuth()).id,
      servicesIds: selectedServices,
      reservationYear: getYear(activeEventTime!),
      reservationMonth: getMonth(activeEventTime!),
      reservationStart: activeEventTime,
      reservationEnd: addMinutes(activeEventTime!, appointmentDuration),
      duration: appointmentDuration,
      charge: appointmentCharge,
      status: "Zarezerwowana",
    }

        const result = await addNewReservation(data)
        return result  

      }catch(err){
        console.error("Error in addReservation:", err)
        throw err
      }
    }
  })

  const handleBooking = () =>{
    try{ 
      mutation.mutate()
      router.replace('/')
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="absolute w-full h-full top-0 bg-white">
      {/* NAVIGATION */}
      <nav className="relative flex flex-row justify-between items-center px-20 pt-11">
          <Link href="/"><h3 className="font-semibold text-2xl/7">CarFit</h3></Link>
          <NavigationCloseBookingButton/>
      </nav>
      {/* CONTENT */}
      <div className="mx-[285px] flex justify-between mt-[100px]">
        {/* CHOOSING SERVICE */}

        {activeBookingStep == 1 && <BookingChoosingServices data={data}/>}
        {activeBookingStep == 2 && <BookingCalendar/>}
      
        {/* APPOINTMENT SUMMARY */}
        <div className={cn("", activeBookingStep == 3 ? "w-full flex justify-center" : "w-4/12")}>
          <div className={cn("flex flex-col gap-5",  activeBookingStep == 3 ? "w-4/12" : "w-full")}>
            <h1 className="text-black text-xl font-medium tracking-normal">Appointment Summary</h1>
            <div className="flex flex-col gap-4 w-full px-5 py-7 border border-[#D4D4D4] rounded-md">

              {selectedDate && activeEventTime ? 
              (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 px-1">
                    <div className="flex flex-row gap-2 items-center">
                      <Calendar size={23} color="#555" strokeWidth={1.5}/> 
                      <p className="font-normal text-[#555] text-sm">{`${format(selectedDate, 'cccc')} ${format(selectedDate, 'd')} ${format(selectedDate, 'MMMM')}`}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <Clock size={23} color="#555" strokeWidth={1.5}/> 
                      <p className="font-normal text-[#555] text-sm">{`${getHours(activeEventTime)}:${getMinutes(activeEventTime) == 0 ? `${getMinutes(activeEventTime)}0` : getMinutes(activeEventTime)}`} {calculateDuration()}</p>
                    </div>
                  </div>
                  <hr className="w-full bg-[#D4D4D4]"/>
                </div>
              ) : null
              }
              
              {selectedServices.length > 0 && data 
              ? services.map((item, index) => (
                selectedServices.includes(item.id) && <BookingSummaryItem key={index} serviceData={item} activeStep={activeBookingStep}/> 
              ))
              :  <p className="text-center font-normal text-base text-[#555555]">No services added</p>
              }

              {selectedServices.length > 0 && (
                <>
                  <hr className="w-full bg-[#D4D4D4]"/>
                  <div className="w-full flex flex-row justify-between px-1">
                    <p className="text-sm text-[#111111] font-semibold">Total</p>
                    <p className="text-sm text-[#111111] font-semibold">{calculateTotalPrice()} PLN</p>
                  </div>
                </>
              )}

            </div>
            <button 
              disabled={isButtonDisabled()} 
              onClick={activeBookingStep === 3 ? () => handleBooking() : moveToNextBookingStep}
              className={cn("w-full py-3.5 text-center font-normal text-base rounded-md", 
                isButtonDisabled() ? "bg-[#F2F4F8] text-[#555555]" : "bg-[#000] text-[#FFFFFF] hover:bg-[#111]")}
            >
              {activeBookingStep === 3 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
 