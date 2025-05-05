'use client'
import Link from 'next/link';
import DashboardContentContainer from '@/components/dashboard/dashboard-content-container';
import { cn } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getSettingsDataForBusiness } from '../../actions';
import { SettingsBusinessDetailsView } from '@/components/dashboard/settings/settings-business-details-view';
import { SettingsBusinessLocationView } from '@/components/dashboard/settings/settings-business-location-view';
import { SettingsBusinessSocialsView } from '@/components/dashboard/settings/settings-business-socials-view';
import { useState } from 'react';

export default function SettingsPage() {
  const [openView, setOpenView] = useState<string>("details")

  const {data: settings, status: settingsStatus} = useQuery({
    queryKey: ["settingsServiceData"],
    queryFn: async () => {
      const settingData = await getSettingsDataForBusiness()
      return settingData
    }
  }) 

  if (openView === "details") {
    var title = "Business details";
    var subtitle = "Zarządzaj danymi swojego serwisu";
  } else if (openView === "locations"){
    var title = "Locations";
    var subtitle = "Zarządzaj lokalizacją swojego serwisu";
  } else if (openView === "links"){
    var title = "Social links";
    var subtitle = "Dodaj, usuń lub edytuj linki do swoich mediów społecznościowych";
  }

  if(settingsStatus =="pending" || settings == undefined) return <p>Pending...</p>
  if(settingsStatus =="error") return <p>Error...</p>

  const settingsBusinessDetailsViewData = {businessName: settings.name, language: "Polski", country: "Polska", currency: "PLN" }
  const settingsBusinessLocationViewData = {town: settings.town, district: settings.district, street: settings.street, zipcode: settings.zipcode }
  const settingsBusinessSocialsViewData = {fb: "facebook.com", ig: "instagram.com", website: "Brak"}

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
            <p 
            className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md  hover:cursor-pointer",  
            openView == "details" ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}
            onClick={() => {setOpenView("details")}}
            >
              Business details
            </p>
            <p 
              className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md  hover:cursor-pointer", 
              openView == "locations" ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}
              onClick={() => {setOpenView("locations")}}
            >
              Locations
            </p>
            <p 
              className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md hover:cursor-pointer", 
              openView == "links" ? "bg-[#111] text-white font-medium " : "hover:bg-[#F2F4F8]")}
              onClick={() => {setOpenView("links")}}
            >
              Social links
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] w-7/12">
          <div className="p-[20px] border-[0.5px] border-[#D4D4D4] rounded-[5px]">
            <h2 className="m-0 p-0 mb-[5px] text-lg font-medium text-[#333333]">{title}</h2>
            <p className="m-0 p-0 text-[13px] font-light text-[#777777]">{subtitle}</p>
          </div>

          {openView == "details" && <SettingsBusinessDetailsView settings={settingsBusinessDetailsViewData}/>}
          {openView == "locations" && <SettingsBusinessLocationView settings={settingsBusinessLocationViewData}/>}
          {openView == "links" && <SettingsBusinessSocialsView settings={settingsBusinessSocialsViewData}/>}
        </div>
      </div>
    </DashboardContentContainer>
  );
}