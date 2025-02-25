import Image from "next/image";
import review_image from '../../public/profile_picture.jpeg'

export const ServicePageReview = ({rewiever, date, rating, description}:{rewiever:string, date:string, rating:number, description:string}) => {
  return (
    <div className="w-full flex flex-col gap-4 bg-[#F6F6F6] border-[0.5px] border-[#CCCCCC] p-[20px] rounded-[7px]">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3">
          <Image src={review_image} alt="Person image" width={45} height={45} className="rounded-[50%] shadow-[0px_0px_3px_1px_#00000040]"/>
          <div className="flex flex-col">
            <h2 className="text-[#333333] text-[15px] font-medium">{rewiever}</h2>
            <p className="text-[#555555] text-[13px] font-normal">{date}</p>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          {[...Array(rating)].map((i, _)=> {
            return(
              <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" stroke="#AFA04D" viewBox="0 0 16 16" >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            )
          })}
        </div>
      </div>
      <p className="text-[#000000] text-[15px] font-light text-pretty leading-5">{description}</p>
    </div>
  );
};
