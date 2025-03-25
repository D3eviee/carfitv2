import { getISODay } from "date-fns"
import { Clock, DotIcon } from "lucide-react"
import { BookingButton } from "./service/booking-button";

type Reviews = {
  rate: number;
  id: string;
  createdAt: Date;
  serviceID: string;
  clientId: string;
  content: string;
}[]

export const ServicePageSumarry = ({workingTimeData, serviceData, reviewsData}) => {

    const x = getISODay(new Date())
    const today = workingTimeData[x-1]

    const now = new Date()
    const openTime = new Date();
    const closeTime = new Date();
    
    //Parsing 
    const [openHour, openMin] = today.open.split(":").map(Number);
    const [closeHour, closeMin] = today.close.split(":").map(Number);
    
    //Setting date object for opening and closing
    openTime.setHours(openHour, openMin, 0, 0);
    closeTime.setHours(closeHour, closeMin, 0, 0);

    const getDetailedReviewsInformation = (reviewsData:Reviews
    ) => {
      let averageRating = 0.00;
      reviewsData.map((item)=> {
        averageRating += item.rate 
      })

      const numberOfReviews = reviewsData.length 
      if(numberOfReviews == 0) averageRating = 0
      else averageRating = averageRating/numberOfReviews

      return {averageRating, numberOfReviews}
    }

    const {averageRating, numberOfReviews} = getDetailedReviewsInformation(reviewsData)

    let openingData: string;
    let isOpen: string
    let isOpenBool: boolean
    if(today.isOpen && (now >= openTime) && (now <= closeTime)){
      isOpen = "Otwarte:"
      isOpenBool = true
      openingData = `${today.open} - ${today.close}`
    }else if(today.isOpen && (now <= closeTime)){
      isOpen = "Zamknięte:"
      isOpenBool = false
      openingData = ` otwarcie o ${today.open}`
    }else{
      isOpen = "Zamknięte"
      isOpenBool = false
      openingData = `` 
    }

    return (
        <div className="h-fit sticky top-3 flex flex-row w-[441px] shadow-[0px_0px_6px_2px_#7777771A] p-6 rounded-[10px] right-0">
        <div className="flex  w-full flex-col gap-[30px]">
          <div className="flex flex-col gap-2">
            <h2 className="text-[25px] text-[#111111] font-bold leading-7">{serviceData.name}</h2>
            <p className="text-[16px] text-[#333333] font-medium">{serviceData.street}, {serviceData.town}, {serviceData.zipcode}</p>
            <div className="flex flex-row gap-1.5 items-center">
              {averageRating != 0 ||  "No reviews"}
              <p className="text-[16px] font-bold text-[111111]">{averageRating != 0 && "No reviews"}</p>
              <div className="flex flex-row gap-[3px]">
              {numberOfReviews > 0 && (
              <div className="flex flex-row gap-[3px]">
                {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
                  <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                ))}
                {Array.from({ length: 5 - Math.floor(averageRating) }, (_, index) => (
                  <svg key={index} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F4F4F4" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                ))}
              </div>
              )}
              </div>
              <p className="text-[16px] font-normal text-[111111]">{numberOfReviews == 0 && `(${numberOfReviews})`}</p> 
          </div>
        </div>


        <BookingButton/>
          
        <hr className="h-1"/>

        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-[5px] items-center">
            <Clock strokeWidth={2} color="#000000"/>
            {isOpenBool
            ? <p className="ztext-[18px]  text-[#009600] font-bold">{isOpen}<span className="font-normal text-[#333333]">{openingData}</span></p>
            : <p className="ztext-[18px]  text-[#D05151] font-bold">{isOpen}<span className="font-normal text-[#333333]">{openingData}</span></p>
            }
          </div>
          
          <div className="flex flex-col gap-[7px]">
            {workingTimeData?.map((dayData, index) => (
              <div key={index} className="w-full flex flex-row items-center justify-between">
              <div className="flex flex-row gap-1">
                <DotIcon strokeWidth={5}  color={dayData.isOpen ? "#009600" : "#D05151"}/>
                <p  className="text-[18px] text-[#333333] font-medium">{dayData.dayOfWeek}</p>
              </div>
              {dayData.isOpen
               ? <p className="text-[18px] text-[#000000] font-medium">{`${dayData.open} - ${dayData.close}`}</p> 
               : <p className="text-[18px] text-[#777777] font-medium">Zamknięte</p>
              }
              </div>
            ))
          } 
            </div>
                </div>
        </div>
    </div>
    )
}