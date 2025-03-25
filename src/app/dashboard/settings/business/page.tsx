import { IoMdArrowBack } from "react-icons/io";
import Link from 'next/link';
import Image from 'next/image';
import { RiMoreFill } from "react-icons/ri";
import DashboardContentContainer from '@/components/dashboard/dashboard-content-container';
import { getServiceData } from "@/actions/actions";
import { serviceAuth } from "@/lib/session";
import { cn } from "@/utils";
import tesla_service from '../../../../../public/car_service.jpg'
import { Params } from "next/dist/server/request/params";
import { ArrowLeft, MoreVertical } from "lucide-react";


export default async function SettingsPage({searchParams}:{searchParams:Params}) {
  const params  = await searchParams;
  const activeTab = params.tab;

  if (activeTab === "details") {
    var title = "Business details";
  } else if (activeTab === "locations"){
    var title = "Locations";
  } else if (activeTab === "links"){
    var title = "Social links";
  }

  return (
    <DashboardContentContainer>
      <div className="flex items-center gap-[20px]">
        <Link href="/dashboard/settings" className="bg-[#111] p-[10px] flex justify-center items-center rounded-[90px] bg-[#] shadow-[0px_0x_2px_0px_#33333333] hover:bg-[#333] hover:cursor-pointer">
          <ArrowLeft color="#FFFFFF" size={20} strokeWidth={2} />
        </Link>
        <div className="px-[7px] py-[15px] rounded-[5px] border-1 border-[#D4D4D4] text-[13px]">
        <p className="m-0 p-0 font-normal text-[#333333]"><span className="m-0 p-0 font-light text-[#777777]">Business | </span> Business Information</p>
        </div>
      </div>
      
      <div className="mt-[30px] flex flex-row gap-[30px]">
        <div className="h-fit min-w-52 px-[15px] py-[20px] border-[0.5px] border-[#D4D4D4] ml-[70px] rounded-[10px]">
          <h2 className="m-0 mb-[20px] font-normal text-medium text-[#333333]">Business Information</h2>
          <div className="flex gap-[10px] flex-col">
            <Link href={'?tab=details'}>
              <p className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md", activeTab == "details" ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}>Business details</p>
            </Link>
            <Link href={'?tab=locations'}>
            <p className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md", activeTab == "locations" ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}>Locations</p>
            </Link>
            <Link href={'?tab=links'}>
            <p className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md", activeTab == "links" ? "bg-[#111] text-white font-medium " : "hover:bg-[#F2F4F8]")}>Social links</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="p-[20px] border-[0.5px] border-[#D4D4D4] rounded-[5px]">
            <h2 className="m-0 p-0 mb-[5px] text-lg font-medium text-[#333333]">{title}</h2>
            <p className="m-0 p-0 text-[13px] font-light text-[#777777]">Set your business name, country  and language preferences. Add social media links to your profile.</p>
          </div>

          {activeTab === "details" && <BusinessDetailsForm/>}
          {activeTab === "locations" && <BusinessLocationsForm/>}
          {activeTab === "links" && <BusinessSocialLinksForm/>}
        </div>
      </div>
    </DashboardContentContainer>
  );
}

export async function BusinessDetailsForm(){

  const serviceid = await serviceAuth()
  const serviceData = await getServiceData(serviceid.id)

  return(
    <div className="py-[30px] px-[50px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
      <div className="flex justify-end">
        <button className="ml-[100%] text-[#F25287] rounded-[5px] py-[5px] px-[19px] bg-white border-[0.5px] border-[#F25287] text-xs font-medium shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#F25287] hover:text-white">Edit</button>
      </div>

      <div className="mt-[30px] grid grid-cols-2 grid-rows-2 gap-[40px]">
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Business name</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">{serviceData?.name}</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Language</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">English</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Country</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">United States</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Currency</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">USD</p>
        </div>
      </div>
    </div>
  )
}

export function BusinessLocationsForm(){
  return(
    <div className="py-[30px] px-[50px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
      <div className="flex justify-end">
        <button className="ml-[100%] text-[#F25287] rounded-[5px] py-[5px] px-[19px] bg-white border-[0.5px] border-[#F25287] text-xs font-medium shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#F25287] hover:text-white">Edit</button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="mt-10">
          <div className="flex flex-row gap-3 w-full border-[0.5px] border-[#D4D4D4] bg-[#F6F6F6] p-3 rounded-[7px]">
            <Image src={tesla_service} alt="service-image" width={149} height={88} className="rounded-[8px]"/>
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-row justify-between">
                  <h2 className="text-[#333] text-sm font-medium">Tesla Auto Service</h2>
                  <MoreVertical color="#777" size={20} />
                </div>
                <h4 className="text-[#555] text-xs font-normal">1921 Calico Drive | Kennewick | Washington</h4>
            </div>
          </div>
        </div>

          <div className="flex flex-row gap-3 w-full border-[0.5px] border-[#D4D4D4] bg-[#F6F6F6] p-3 rounded-[7px]">
            <Image src={tesla_service} alt="service-image" width={149} height={88} className="rounded-[8px]"/>
              <div className="w-full flex flex-col gap-1">
                <div className="w-full flex flex-row justify-between">
                  <h2 className="text-[#333] text-sm font-medium">Tesla Auto Service</h2>
                  <MoreVertical color="#777" size={20} />
                </div>
                <h4 className="text-[#555] text-xs font-normal">1921 Calico Drive | Kennewick | Washington</h4>
            </div>
        </div>
      </div>
  </div>
  )
}

export function BusinessSocialLinksForm(){
  return(
    <div className="py-[30px] px-[50px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
    <div className="flex justify-end">
      <button className="ml-[100%] text-[#F25287] rounded-[5px] py-[5px] px-[19px] bg-white border-[0.5px] border-[#F25287] text-xs font-medium shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#F25287] hover:text-white">Edit</button>
    </div>

      <div className="mt-[30px] grid grid-cols-2 grid-rows-2 gap-[40px]">
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Facebook</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">https://www.facebook.com</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Instagram</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">To be provided</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className="p-0 m-0 text-[#333333] text-[13px] font-semibold">Website</h3>
          <p className="max-w-[230px] p-0 m-0 text-[#777777] text-[13px] font-normal">To be provided</p>
        </div>
      </div>


  
    </div>
  )
}