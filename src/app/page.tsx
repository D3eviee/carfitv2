import { CalendarDays, Clock, MapPinned, Search } from "lucide-react";
import Image from "next/image";

import wheels_image from '../../public/wheels.jpg'

export default function Home() {
  return (
    <div className="mt-64 mx-64">
      <div className="mb-11">
        <h1 className=" w-full text-6xl font-semibold">Book a visit and</h1>
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

      <div className="mb-20 "> 
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
    </div>
  );
}
