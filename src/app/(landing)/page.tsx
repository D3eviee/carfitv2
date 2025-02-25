import { CalendarDays, Clock, MapPinned, Search, Star } from "lucide-react";
import Image from "next/image";

import wheels_image from '../../../public/wheels.jpg'
import car_service from '../../../public/car_service.jpg'
import Link from "next/link";
import { getRecommendedServices } from "@/actions/actions";

const createLinkFormat = (id:string, companyName:string) : string  => {
  const companyNameToLowerCase= companyName.toLowerCase()
  const companyLink = companyNameToLowerCase.replaceAll(" ", "-")
  return `/service/${companyLink}/${id}`
}

export default async function  Home() {
  const recommendedData = await getRecommendedServices();

  return (
    <div className="mt-64 mx-64 mb-64">
      <div className="mb-11">
        <h1 className="w-full text-6xl font-semibold">Book a visit and</h1>
        <h1 className="w-full text-6xl font-semibold">keep your car fit</h1>
      </div>

      <div className="py-2.5 px-3.5 mb-56 flex flex-row  border items-center border-[#333333] rounded-md gap-[15px]">
        <div className="w-[250px] flex flex-row border-r-[0.5px] border-[#777777] gap-3 pr-1">
          <Search strokeWidth={1.5}/>
          <input type="text" placeholder="Type of service" className="w-[200px] outline-none"/>
        </div>
        <div className="w-[250px] flex flex-row border-r-[0.5px] border-[#777777] gap-3">
          <label htmlFor="location"><MapPinned strokeWidth={1.5}/></label>
          <input type="text" id="location" placeholder="Location" className="w-[200px] outline-none placeholder:text-red"/>
        </div>
        <div className="w-[250px] flex flex-row border-r-[0.5px] border-[#777777] gap-3">
          <CalendarDays strokeWidth={1.5}/>
          <input type="text" placeholder="Date" className="w-[200px] outline-none"/>
        </div>
        <div className="w-[250px] flex flex-row border-r-[0.5px] border-[#777777] gap-3">
          <Clock/>
          <input type="text" placeholder="Time" className="w-[200px] outline-none"/>
        </div>

        <button className="h-7 font-semibold text-sm py-1 px-4 rounded-md bg-black text-white hover:bg-[#333333]">Search</button>
      </div>

      <div className="mb-100 "> 
        <h3 className="font-md text-[#333] text-[25px]" >Top Categories</h3>

        <div className="mt-[30px] flex gap-8 overflow-scroll ">

          <div className="flex-none w-[200px] h-[170px] rounded-md  border-1 border-[0.5px] border-[#D4D4D4] shadow-md overflow-clip">
            <div className="h-[128px] overflow-hidden">
              <Image src={wheels_image}  alt="wheels change" height={128} width={200}/>
            </div>
            <div className="flex items-center bg-white px-2.5 h-[42px]">
              <p>Wheel change</p>
            </div>
          </div>

          <div className="flex-none w-[200px] h-[170px] rounded-md  border-1 border-[0.5px] border-[#D4D4D4] shadow-md overflow-clip">
            <div className="h-[128px] overflow-hidden">
              <Image src={wheels_image}  alt="wheels change" height={128} width={200}/>
            </div>
            <div className="flex items-center bg-white px-2.5 h-[42px]">
              <p>Wheel change</p>
            </div>
          </div>

          <div className="flex-none w-[200px] h-[170px] rounded-md  border-1 border-[0.5px] border-[#D4D4D4] shadow-md overflow-clip">
            <div className="h-[128px] overflow-hidden">
              <Image src={wheels_image}  alt="wheels change" height={128} width={200}/>
            </div>
            <div className="flex items-center bg-white px-2.5 h-[42px]">
              <p>Wheel change</p>
            </div>
          </div>

          <div className="flex-none w-[200px] h-[170px] rounded-md  border-1 border-[0.5px] border-[#D4D4D4] shadow-md overflow-clip">
            <div className="h-[128px] overflow-hidden">
              <Image src={wheels_image}  alt="wheels change" height={128} width={200}/>
            </div>
            <div className="flex items-center bg-white px-2.5 h-[42px]">
              <p>Wheel change</p>
            </div>
          </div>

          <div className="flex-none w-[200px] h-[170px] rounded-md  border-1 border-[0.5px] border-[#D4D4D4] shadow-md overflow-clip">
            <div className="h-[128px] overflow-hidden">
              <Image src={wheels_image}  alt="wheels change" height={128} width={200}/>
            </div>
            <div className="flex items-center bg-white px-2.5 h-[42px]">
              <p>Wheel change</p>
            </div>
          </div>

          <div className="flex-none w-[200px] h-[170px] rounded-md  border-1 border-[0.5px] border-[#D4D4D4] shadow-md overflow-clip">
            <div className="h-[128px] overflow-hidden">
              <Image src={wheels_image}  alt="wheels change" height={128} width={200}/>
            </div>
            <div className="flex items-center bg-white px-2.5 h-[42px]">
              <p>Wheel change</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 "> 
        <h3 className="font-md text-[#333] text-[25px]">Recommended</h3>

        <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
        {recommendedData ?
          recommendedData!.map((service) => {
            return (
              <Link href={createLinkFormat(service.id, service.name)} key={service.id}>
              <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
                <div className="h-[178px] overflow-hidden">
                  <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
                </div>

                <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
                  <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                    {service.name}
                  </h3>
                  <p className="font-light text-[#777777] text-[14px] mb-1">
                  {service.street} | {service.zipcode} | {service.town}
                  </p>
                  
                  <div className="flex flex-row items-center mb-2">
                    <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                    <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                    <p className="font-normal text-[#333333] text-[15px]">(120)</p>
                  </div>
                  
                  <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                    Car Detailing
                  </p>
                </div>  
              </div>
            </Link>
            )
            })
          : "No data"
        }

          <div className="flex-none w-[324px] h-[325px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden ">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>
        </div>
      </div>

      <div className="mt-20 "> 
        <h3 className="font-md text-[#333] text-[25px]">Popular</h3>

        <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>

          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>

          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>

          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden ">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>
        </div>
      </div>

      <div className="mt-20 "> 
        <h3 className="font-md text-[#333] text-[25px]">New</h3>

        <div className="mt-[30px] flex flex-row gap-8 overflow-scroll">
          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>

          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>

          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>

          <div className="flex-none w-[324px] border-[0.5px] border-[#D4D4D4] rounded-[15px] overflow-hidden shadow-[0px_1px_4px_1px_#ACACAC40]">
            <div className="h-[178px] overflow-hidden ">
              <Image src={car_service} alt="car_service" className="w-full h-full  rounded-none"/>
            </div>

            <div className="px-[15px] pt-[10px] pb-[15px] bg-white">
              <h3 className="font-black tracking-normal text-[#333333] text-[16px] mb-0">
                Auto-Klima Oliwier Krywko
              </h3>
              <p className="font-light text-[#777777] text-[14px] mb-1">
                Zgoda 54 | 60-122 Poznań
              </p>
              
              <div className="flex flex-row items-center mb-2">
                <p className="font-normal text-[#333333] text-[15px]">4.7</p>
                <Star fill="gold" stroke="none" className="size-5 ml-[5px] mr-[8px]"/>
                <p className="font-normal text-[#333333] text-[15px]">(120)</p>
              </div>
              
              <p className="inline rounded-2xl text-[11px] font-black text-[#000000] border-[0.5px] border-[#777777] py-[5px] px-[7px]">
                Car Detailing
              </p>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}
