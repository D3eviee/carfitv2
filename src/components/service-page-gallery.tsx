import Image from "next/image"
import service_image_1 from "../../public/service_image_1.jpg"
import service_image_2 from "../../public/service_image_2.jpg"
import service_image_3 from "../../public/service_image_3.jpg"

export const ServicePageGallery = () => {
    return (
        <div className="mt-[25px] mb-[25px] h-[510px] flex gap-[16]">
          <Image src={service_image_1} alt="Service image 1" width={760} className="rounded-[10px]"/>
          <div className="flex flex-col gap-[16px]">
            <div className="flex-none overflow-hidden rounded-[10px] h-[247px] w-[441px]">
              <Image src={service_image_2} alt="Service image 2" height={247} width={441}/>
            </div>
            <div className="flex-none overflow-hidden rounded-[10px] h-[247px] w-[441px]">
              <Image src={service_image_3} alt="Service image 2" height={247} width={441}/>
            </div>
          </div>
        </div>
    )
}