import { createLinkFormat } from "@/lib/functions"
import Image from "next/image"
import Link from "next/link"
import car_service from '@/../public/car_service.jpg'
import { Star } from "lucide-react"

export default function BusinessCard({serviceData}:{serviceData:BusinessCardProps}){
  const {id, name, image, category, town, district, street, zipcode, reviews} = serviceData

  const numberOfReviews = reviews.length
  const averageRating = numberOfReviews ? (reviews.reduce((sum, r) => sum + r.rate, 0) / numberOfReviews).toFixed(1) : 0;

  return (
    <Link href={createLinkFormat(id, name)} key={id}>
      <div className="flex-none w-[324px] h-[340px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
        {/* IMAGE BOX */}
        <div className="h-[190px] overflow-hidden">
          <Image src={car_service} alt="car service image" className="w-full h-full rounded-none"/>
        </div>
        {/* CONTENT BOX */}
        <div className="min-h-[150px] relative flex flex-col gap-1.5 px-4 py-4 bg-white">
          <h3 className="text-[#111] font-semibold text-base">{name}</h3>
          <p className="font-normal text-[#333] tracking-tight text-sm">{street} | {zipcode} | {town}</p>
          {/* RAITING BOX */}
          <div className="flex flex-row gap-1 items-center">
            {numberOfReviews == 0 ? 
              <p className="font-normal text-[#333333] text-sm">No reviews</p> 
            :
              <>
              <p className="font-normal text-[#333333] text-sm">{averageRating}</p>
              <Star fill="gold" stroke="none" className="size-5 -ml-0.5"/>
              </>
            }
            <p className="font-normal text-[#333333] text-[15px]">{`(${numberOfReviews})`}</p>
          </div>
          {/* SERVICE CATEGORY */}   
          <p className="absolute bottom-5 rounded-md font-semibold tracking-wider text-[10px] bg-[#111] text-white border-[#777777] py-[5px] px-[7px] shadow-[0px_1px_4px_1px_#ACACAC40]">{category}</p>
        </div>  
      </div>
    </Link>
  )
}



