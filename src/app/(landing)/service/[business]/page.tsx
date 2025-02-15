import { Clock, Dot, DotIcon, StarIcon } from "lucide-react";
import service_location from '../../../../../public/service_location.jpg'
import review_image from '../../../../../public/profile_picture.jpeg'
import Image from "next/image";
import { ServicePageTitle } from "@/components/service-page-title";
import { ServicePageGallery } from "@/components/service-page-gallery";
import { ServicePageService } from "@/components/service-page-service";
import { ServicePageReview } from "@/components/service-page-review";

const dummmyCompany = {
    id: 1,
    name: " LPM Mechanika Pojazdowa Leszek Patan",
    town: "Poznań",
    region: "Nowe Miasto",
    address: "Warszawska 39 /41",
    rating: "4.7",
    description: "Nasz warsztat istnieje od 2000 roku. Powstał z pasji do obsługi samochodów wyścigowych i startów w wyścigach. Przez ponad 20 lat zdobyliśmy duże doświadczenie, które staramy się przekładać na jakość obsługi. Do każdego zlecenia podchodzimy indywidualnie. Naprawy wykonujemy fachowo i możliwie szybko. W warsztacie są 4 stanowiska z podnośnikami. Dla klientów przygotowaliśmy poczekalnię. Dysponujemy również lawetą."
}

const review = {
  id: 1,
  reviewer: "Paweł",
  createdAt: "29.27.2025",
  rating: 4,
  reviewContent: "Dostarczony samochód do zdiagnozowania z dokładnym opisem, jak odtworzyć problem. Po „naprawie”, polegającej na wymianie paska i napinacza, problem pozostał nierozwiązany, koszty zrzucone na klienta. Mechanik nie zadał sobie trudu, aby upewnić się, że jego praca faktycznie przyniosła efekt. Cyniczne podejście właściciela, a wnętrze auta ubrudzone smarem lub olejem – zainwestujcie sobie w mydło albo rękawiczki",
  
}

export default function BusinessPage() {

  return (
    <div className="mt-[52px] box-border mx-[236px]">
      {/*PAGE TITLE SECION*/}
      <div className="flex flex-col gap-1">
        {/*SERVICE TITLE*/}
        <ServicePageTitle name={dummmyCompany.name} town={dummmyCompany.town} region={dummmyCompany.region}/>
        
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
                <ServicePageReview rewiever={review.reviewer} date="14.02.2025" rating={4} description={review.reviewContent} />
                <ServicePageReview rewiever={review.reviewer} date="15.02.2025" rating={3} description={review.reviewContent} />
                <ServicePageReview rewiever={review.reviewer} date="16.02.2025" rating={2} description={review.reviewContent} />
                <ServicePageReview rewiever={review.reviewer} date="17.02.2025" rating={1} description={review.reviewContent} />
              </div>
            </div>
          </div>

          {/*RIGHT PANEL*/}
          <div className="h-fit sticky top-3 flex flex-row w-[441px] shadow-[0px_0px_6px_2px_#7777771A] p-6 rounded-[10px] right-0">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-2">
                <h2 className="text-[25px] text-[#111111] font-bold leading-7">{dummmyCompany.name}</h2>
                <p className="text-[16px] text-[#333333] font-medium">{dummmyCompany.address}, {dummmyCompany.region}, {dummmyCompany.town}</p>
                <div className="flex flex-row gap-1.5 items-center">
                  <p className="text-[16px] font-bold text-[111111]">4.7</p>
                  <div className="flex flex-row gap-[3px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700"  viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                  </div>
                  <p className="text-[16px] font-normal text-[111111]">(27)</p> 
              </div>
            </div>

            <div className="w-full bg-[#000000] text-white text-[18px] font-medium text-center leading-[20px] py-[10px] rounded-[7px]" >Zarezerwuj wizytę</div>
              
            <hr className="h-1"/>

            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-[5px] items-center">
                <Clock strokeWidth={2} color="#000000"/>
                <p className="text-[18px] text-[#009600] font-bold">Otwarte <span className="font-normal text-[#333333]">zamknięcie: 20:00</span></p>
              </div>
              
              <div className="flex flex-col gap-[7px]">
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <DotIcon strokeWidth={5} color="#009600"/>
                    <p  className="text-[18px] text-[#333333] font-medium">Poniedziałek</p>
                  </div>
                  <p className="text-[18px] text-[#000000] font-medium">9:00 - 20:00</p>
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <DotIcon strokeWidth={5} color="#009600"/>
                    <p  className="text-[18px] text-[#333333] font-medium">Wtorek</p>
                  </div>
                  <p className="text-[18px] text-[#000000] font-medium">9:00 - 20:00</p>
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <DotIcon strokeWidth={5} color="#009600"/>
                    <p  className="text-[18px] text-[#333333] font-medium">Środa</p>
                  </div>
                  <p className="text-[18px] text-[#000000] font-medium">9:00 - 20:00</p>
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <DotIcon strokeWidth={5} color="#009600"/>
                    <p  className="text-[18px] text-[#333333] font-medium">Czwartek</p>
                  </div>
                  <p className="text-[18px] text-[#000000] font-medium">9:00 - 20:00</p>
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <DotIcon strokeWidth={5} color="#009600"/>
                    <p  className="text-[18px] text-[#333333] font-medium">Piątek</p>
                  </div>
                  <p className="text-[18px] text-[#000000] font-medium">9:00 - 20:00</p>
                </div>

                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <DotIcon strokeWidth={5} color="#D05151"/>
                    <p  className="text-[18px] text-[#777777] font-medium">Sobota</p>
                  </div>
                  <p className="text-[18px] text-[#777777] font-medium">Zamknięte</p>
                </div>
                <div className="w-full flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-1">
                    <DotIcon strokeWidth={5} color="#D05151"/>
                    <p  className="text-[18px] text-[#777777] font-medium">Niedziela</p>
                  </div>
                  <p className="text-[18px] text-[#777777] font-medium">Zamknięte</p>
                </div>
              </div>


              </div>
            </div>
          </div>
        </div>

        <div className="h-[50px]">
        </div>

      </div>
    </div>
  );
}
