import { getISODay } from "date-fns"
import { Dot } from "lucide-react"

type Reviews = {
    rate: number;
    id: string;
    createdAt: Date;
    serviceID: string;
    clientId: string;
    content: string;
}[]

export const ServicePageTitle = ({data, workingTime, reviews}) => {
    const x = getISODay(new Date())
    const today = workingTime[x-1]
    const openingData = `Otwarte: ${today.open} - ${today.close}`

    const getDetailedReviewsInformation = (reviews:Reviews) => {
      let averageRating = 0.00;
      reviews.map((item)=> {
        averageRating += item.rate 
      })

      const numberOfReviews = reviews.length 

      if(numberOfReviews == 0) averageRating = 0
      else averageRating = averageRating/numberOfReviews
    
      return {averageRating, numberOfReviews}
    }

    const {averageRating, numberOfReviews} = getDetailedReviewsInformation(reviews)

    return (
        <div className="flex flex-col gap-1">
        <p className="flex place-items-baseline font-normal text-[15px] text-[#777777]">{`${data.category} | ${data.town} | ${data.district} |`} 
          <span className="text-[#333333] ml-1">{data.name}</span>
        </p>
        <h1 className="m-0 p-0 text-[40px] text-[#11111] font-bold">{data.name}</h1>
        {/* REVIEWS SECTION */}
        <div className="flex flex-row items-center">
          <div className="flex flex-row gap-1 items-center">
            {averageRating != 0 ||  "No reviews"}
          <p className="text-[15px] font-bold text-[111111]">{averageRating != 0 && "No reviews"}</p>
          
          {averageRating != 0 && (
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

            {/* NUMBERS OF REVIEWS */}
            <p className="text-[15px] font-normal text-[111111]">{numberOfReviews == 0 && `(${numberOfReviews})`}</p> 
          </div>

          {/*IS OPEN NOW MARK*/}
          <Dot/>
          <p className="text-[15px] font-normal text-[009600]">{today.isOpen ? openingData : "Zamknięte"}</p>

          {/*LOCATION INFORMATION*/}
          <Dot/>
          <p className="text-[15px] font-normal text-[111111]">{`${data.district}, ${data.town} `}</p>
        </div>
        </div>
    )
}