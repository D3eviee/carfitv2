import { Clock, Dot, DotIcon, StarIcon } from "lucide-react";
import service_location from '../../../../../public/service_location.jpg'
import review_image from '../../../../../public/profile_picture.jpeg'
import Image from "next/image";
import { ServicePageTitle } from "@/components/service-page-title";
import { ServicePageGallery } from "@/components/service-page-gallery";
import { ServicePageService } from "@/components/service-page-service";
import { ServicePageReview } from "@/components/service-page-review";
import { getServiceData, getServiceReviews, getWorkingTimeData } from "@/actions/actions";
import { ServicePageSumarry } from "@/components/service-page-summary";

const dummmyCompany = {
    description: "Nasz warsztat istnieje od 2000 roku. Powstał z pasji do obsługi samochodów wyścigowych i startów w wyścigach. Przez ponad 20 lat zdobyliśmy duże doświadczenie, które staramy się przekładać na jakość obsługi. Do każdego zlecenia podchodzimy indywidualnie. Naprawy wykonujemy fachowo i możliwie szybko. W warsztacie są 4 stanowiska z podnośnikami. Dla klientów przygotowaliśmy poczekalnię. Dysponujemy również lawetą."
}

const review = {
  reviewer: "Paweł",
}

export default async function BusinessPage({ params }: { params: {business: string }}) {
  const id = (await params).business[1];
  
  const dniKolejnosc = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" , "Sunday"];

  //getting business data
  const serviceData = await getServiceData(id)
  //getting working time data
  const workingTimeData = await getWorkingTimeData(id)
  //getting service reviews
  const serviceReviews = await getServiceReviews(id)
  
  workingTimeData!.sort(
    (a, b) => dniKolejnosc.indexOf(a.dayOfWeek) - dniKolejnosc.indexOf(b.dayOfWeek)
  );

  return (
    <div className="mt-[52px] box-border mx-[236px]">
      {/*PAGE TITLE SECION*/}
      <div className="flex flex-col gap-1">
        {/*SERVICE TITLE*/}
        <ServicePageTitle data={serviceData} workingTime={workingTimeData}/>
        
        {/*SERVICE GALLERY*/}
        <ServicePageGallery/>

        {/*BOTTOM SECTION*/}

        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-8 bg-[#FFFFFF] w-[743px] p-[30px] shadow-[0px_0px_6px_2px_#7777771A] rounded-[10px]">
            {/*SERVICES*/}
            <div className="flex flex-col gap-2">
              <h1 className="text-[30px] text-[#000000] font-medium">Usługi</h1>
              <div className="flex flex-row gap-[10px] w-full bg-[#F6F6F6] overflow-scroll rounded-[5px] border-[0.5px] border-[#CCCCCC] p-[5px] mb-[15px]">
                <div className="flex-none bg-[#333333] text-[#FFFFFF] text-[15px] font-medium rounded-[6px] px-[10px] py-[5px]">Wymiana opon</div>
                <div className="flex-none bg-[#F6F6F6] text-[#333333] text-[15px] font-base rounded-[6px] px-[10px] py-[5px] border-[0.5px] border-[#000000]">Diagnostyka</div>
                <div className="flex-none bg-[#F6F6F6] text-[#333333] text-[15px] font-base rounded-[6px] px-[10px] py-[5px] border-[0.5px] border-[#000000]">Elektryka</div>
                <div className="flex-none bg-[#F6F6F6] text-[#333333] text-[15px] font-base rounded-[6px] px-[10px] py-[5px] border-[0.5px] border-[#000000]">Klimatyzacja</div>
                <div className="flex-none bg-[#F6F6F6] text-[#333333] text-[15px] font-base rounded-[6px] px-[10px] py-[5px] border-[0.5px] border-[#000000]">Hamulce</div>
                <div className="flex-none bg-[#F6F6F6] text-[#333333] text-[15px] font-base rounded-[6px] px-[10px] py-[5px] border-[0.5px] border-[#000000]">Płyny</div>
                <div className="flex-none bg-[#F6F6F6] text-[#333333] text-[15px] font-base rounded-[6px] px-[10px] py-[5px] border-[0.5px] border-[#000000]">Skrzynia biegów</div>
              </div>
              <ServicePageService/>
              <ServicePageService/>
              <ServicePageService/>
              <ServicePageService/>
              <ServicePageService/>
              <ServicePageService/>
            </div>

            {/*INFO*/}
            <div className="flex flex-col gap-2">
              <h1 className="text-[30px] text-[#000000] font-medium">Informacje</h1>
              <p className="text-[#333333] text-[15px] text-pretty font-normal leading-5">{dummmyCompany.description} </p>
            </div>

            {/*LOCATION*/}
            <div className="flex flex-col gap-2">
              <h1 className="text-[30px] text-[#000000] font-medium">Lokalizacja</h1>
              <Image src={service_location} alt="Location map" className="w-full border-[0.5px] border-[#CCCCCC] shadow-[0px_4px_4px_0px_#00000040]"/>
            </div>

            {/*REVIEWS*/}
            <div className="flex flex-col gap-2">
              <h1 className="text-[30px] text-[#000000] font-medium">Oceny</h1>
              <div className="flex flex-col gap-[15px]">
              {serviceReviews?.length > 0 ?
                serviceReviews?.map((reviewData, index) => (
                  <ServicePageReview key={index} rewiever={review.reviewer} date={reviewData.createdAt.toDateString()} rating={reviewData.rate} description={reviewData.content} />
                ))
              : <p className="text-black">No reviews</p>
              }
              </div>
            </div>
          </div>

          {/*RIGHT PANEL*/}
          <ServicePageSumarry workingTimeData= {workingTimeData} serviceData={serviceData}/>
        </div>

        <div className="h-[50px]">
        </div>

      </div>
    </div>
  );
}
