'use client'
import Link from 'next/link';
import DashboardContentContainer from '@/components/dashboard/dashboard-content-container';
import { cn } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWorkingTimeData, setWorkingTimeData } from '../../actions';
import { useState } from 'react';
import SettingsBusinessWorkHours from '@/components/dashboard/settings/settings-business-work-hours';
import SettingsBusinessWorkHoursEdit from '@/components/dashboard/settings/settings-business-work-hours-edit';
import { useSettingsEditingWorkingHours } from '@/lib/store';


export default function SettingsPage() {
  const queryClient = useQueryClient()
  
  const [openView, setOpenView] = useState<string>("details")

  const setInDays = useSettingsEditingWorkingHours(store => store.setInDays)
  const days = useSettingsEditingWorkingHours(store => store.days)

  const [isEditing, setIsEditing] = useState(false)

  const {data: workingHoursData, status: workingHoursDataStatus} = useQuery({
    queryKey: ["getWorkingTimeData"],
    queryFn: async () => {
      const workingTimeData = await getWorkingTimeData()
      if(workingTimeData !== undefined) setInDays(workingTimeData)
      return workingTimeData
    },
  })

  const {mutate} = useMutation({
    mutationKey: ["editWorkingHours"],
    mutationFn: async () => {
      const workingData = await setWorkingTimeData(days)
      return workingData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getWorkingTimeData'] })
    }
  })

  const handleSave = () => {
    mutate()
    setIsEditing(false)
  }

  if(workingHoursDataStatus =="pending" || workingHoursData == undefined) return <p>Pending...</p>
  if(workingHoursDataStatus =="error") return <p>Error...</p>

  return (
    <DashboardContentContainer>
      <div className="flex items-center gap-[20px]">
        <Link href="/dashboard/settings" className="bg-[#111] p-[10px] flex justify-center items-center rounded-[90px] bg-[#] shadow-[0px_0x_2px_0px_#33333333] hover:bg-[#333] hover:cursor-pointer">
          <ArrowLeft color="#FFFFFF" size={20} strokeWidth={2} />
        </Link>
        <div className="px-[7px] py-[15px] rounded-[5px] border-1 border-[#D4D4D4] text-[13px]">
        <p className="m-0 p-0 font-normal text-[#333333]"><span className="m-0 p-0 font-light text-[#777777]">Dni pracy | </span>Godziny pracy</p>
        </div>
      </div>
      
      <div className="mt-[30px] flex flex-row gap-[30px]">
        <div className="h-fit min-w-52 px-[15px] py-[20px] border-[0.5px] border-[#D4D4D4] ml-[70px] rounded-[10px]">
          <h2 className="m-0 mb-[20px] font-normal text-medium text-[#333333]">Dni robocze</h2>
          <div className="flex gap-[10px] flex-col">
            <p 
            className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md  hover:cursor-pointer",  
            openView == "details" ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}
            onClick={() => {setOpenView("details")}}
            >
              Godziny pracy
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] w-7/12">
          <div className="p-[20px] border-[0.5px] border-[#D4D4D4] rounded-[5px]">
            <h2 className="m-0 p-0 mb-[5px] text-lg font-medium text-[#333333]">Godziny pracy</h2>
            <p className="m-0 p-0 text-[13px] font-light text-[#777777]">Edytuj i zmieniaj godziny otwarcia twojego zakładu pracy</p>
          </div>

          <div className="py-[30px] px-[50px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
            <div className="flex justify-end mb-7">
              
              {!isEditing ? 
                <button 
                  className="ml-[100%] text-[#F25287] rounded-[5px] py-[5px] px-[19px] bg-white border-[0.5px] border-[#F25287] text-xs font-medium shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#F25287] hover:text-white"
                  onClick={() => {setIsEditing(true)}}
                >
                Edit
                </button>
              :
                <button 
                  className="ml-[100%] text-[#F25287] rounded-[5px] py-[5px] px-[19px] bg-white border-[0.5px] border-[#F25287] text-xs font-medium shadow-[0px_1px_2px_0px_#D4D4D4] hover:cursor-pointer hover:bg-[#F25287] hover:text-white"
                  onClick={handleSave}
                >
                Save
                </button>
              }
            </div>
          
            {!isEditing && <SettingsBusinessWorkHours workingHoursData={workingHoursData}/>}
            {isEditing && <SettingsBusinessWorkHoursEdit workingHoursData={days}/>}
          </div>
        </div>
      </div>
    </DashboardContentContainer>
  );
}