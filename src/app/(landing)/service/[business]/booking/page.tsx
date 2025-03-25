'use client'
import { getAllServicesForBusiness, getCategoriesDataForService } from "@/actions/actions";
import { BookingSummaryItem } from "@/components/booking-summary-item";
import { BookingChoosingDate } from "@/components/booking/booking-choosing-date";
import { BookingChoosingServices } from "@/components/booking/booking-choosing-services";
import { NavigationCloseBookingButton } from "@/components/navigation-close-booking-button";
import { cn, getServiceIdFromParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Booking() {
  const [activeBookingStep, setActiveBookingStep] = useState(1)

  const router = useRouter()
  const pathname = usePathname()
  // extracting ID
  const id = getServiceIdFromParams()

    //getting service data
    const { data } = useQuery({
      queryKey: ["services"],
      queryFn: async () => {
        return getAllServicesForBusiness(id);      
      },
    });

  //getting selected items
  const searchParams = useSearchParams();
  const selectedServices = searchParams.get("services")?.split("&") || [];
  
  const calculateTotalPrice = () => {
    let total = 0
    data?.map((item) => {
      if(selectedServices.includes(item.id)) total +=  Number(item.price)
    })
    return total
  }

  const moveToNextBookingStep = () => {
    setActiveBookingStep((step) => step + 1);
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

        {activeBookingStep == 1 && <BookingChoosingServices/>}
        {activeBookingStep == 2 && <BookingChoosingDate/>}
        
        {/* APPOINTMENT SUMMARY */}
        <div className="w-4/12 flex flex-col gap-5">
          <h1 className="text-black text-xl font-medium tracking-normal">Appointment Summary</h1>
          <div className="flex flex-col gap-4 w-full px-5 py-7 border border-[#D4D4D4] rounded-md">
            
            {selectedServices.length > 0 && data 
            ? data.map((item, index) => (
               selectedServices.includes(item.id) && <BookingSummaryItem key={index} serviceData={item}/> 
               
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
            disabled={selectedServices.length==0} 
            onClick={() => moveToNextBookingStep()}
            className={cn("w-full py-3.5 text-center font-normal text-base rounded-md", 
              selectedServices.length==0 ? "bg-[#F2F4F8] text-[#555555]" : "bg-[#000] text-[#FFFFFF] hover:bg-[#111]")}
          >Next
          </button>
        </div>
      </div>
    </div>
  )
}
 