'use client'
import profile_picture from '@/../public/client_profile_picture.jpg'
import { CarFrontIcon, Clock2, PenBox, Phone } from "lucide-react";
import Image from "next/image";

export default function CalendarActiveTaskView() {
  return (
    <div className="flex flex-col gap-1.5 h-72 border rounded-xl p-3">
      <h1 className='font-medium'>Current appointment</h1>
      <div className="flex flex-col rounded-md p-3 gap-2 bg-[#F2F4F8] border">
        <h2 className='text-[#111] text-sm font-base'>Wymiana opon</h2>
        <div className="flex flex-col gap-1.5 ml-0.5 overflow-scroll">
          <div className="flex flex-row gap-1 items-center">
            <Clock2 size={18} strokeWidth={1.5} color="#333"/>
            <p className='text-sm text-[#000] font-light'>8:00 - 10:00</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Image src={profile_picture} alt="profile picture" width={20} height={20} className='rounded-full'/>
            <p className='text-sm text-[#000] font-light'>Hipolit Roszkowski</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <CarFrontIcon size={18} strokeWidth={1.5} color="#333"/>
            <p className='text-sm text-[#000] font-light'>Tesla Model X</p>
          </div>
          <div className="flex flex-row gap-1 ">
            <Phone size={18} strokeWidth={2} color="#333"/>
            <p className='text-sm text-[#000] font-light'>514 036 891</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <PenBox size={18} strokeWidth={2} color="#333"/>
            <p className='text-sm text-[#000] font-light'>This car is great and littt</p>
          </div>
        </div>
        <button className='w-full py-2 bg-[#007AFF] text-center rounded-md text-white text-sm font-semibold mt-2'>FINISHED</button>
      </div>
    </div>
  );
}
