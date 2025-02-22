'use client'
import { Pen } from "lucide-react";
import { FormButton } from "../form-button";
import bcrypt from "bcryptjs";
import { useState } from "react";
import useWorkingDays, { useOnboardingStore } from "@/lib/store";
import { OnboardingEditHoursModal } from "./onboarding-edit-hours-modal";
import { useRouter } from "next/navigation";
import { createService } from "@/actions/actions";


export default function OnboardingWorkingDays() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editedDay, setEditedDay] = useState<WorkingDay>({ isOpen: false, day: "", open: "", close: "" })
  const workingDays = useWorkingDays((state) => state.days);
  const businessData = useOnboardingStore((state) => state)
  const setData = useOnboardingStore((state)=> state.resetData)
  const [error, setError] = useState<string>('')

  const router = useRouter();
  
  const handleOpeningModal = (day:WorkingDay) => {
    setOpenModal(true);
    setEditedDay(day)
  }

  const handleClosingModal = () => {
    setOpenModal(false);
    setEditedDay({ isOpen: false, day: "", open: "", close: "" })
  }


  const handleSubmit = async () => {
      const hashedPassword = await bcrypt.hash(businessData.password!, 10)
      const data = {...businessData, password: hashedPassword}
      
      const result = await createService(data, workingDays)
      console.log(result)
      if(result.status == "failed"){
        setError(result.message)
      }
      else{
        setData()
        router.push('/business')
      }

      
  };

  return (<>
    {openModal ? <OnboardingEditHoursModal day={editedDay} close={handleClosingModal}/> : <></>}
   
    <div>      
      <div>
            {workingDays.map((day, key)=> (
              (<WorkingDay 
                key={key} 
                day={day} 
                onClick={()=>handleOpeningModal(day)} />)
            ))}
      </div>

      <FormButton label="Create account" onClick={handleSubmit}/>
      <p>{error}</p>
    </div>
    </>
  );
}

const WorkingDay = ({day, onClick}:{day: WorkingDay, onClick: () => void}) => {
  const updateIsOpen = useWorkingDays((state) => state.updateIsOpen)

  return (
    <div className="grid grid-cols-[1fr_8fr_8fr] py-3.5 px-1 items-center border-t-[0.5px] border-[#CCCCCC] first-of-type:border-none">
      <input type="checkbox" className="w-4 h-4" defaultChecked={day.isOpen} onChange={(e)=>{updateIsOpen(day.day, e.target.checked)}}/>
      <h3 className="font-normal text-[#333333] pl-3 text-sm">{day.day}</h3>
      <div className="flex items-center justify-end gap-9">
        <p className="box-bordertext-right text-sm m-0 text-[#333333] font-light ">{day.isOpen ? `${day.open} - ${day.close}` : "Closed"}</p>
        {day.isOpen ? <Pen color="#777777" size={15} className="hover:cursor-pointer hover:stroke-[#333333]" onClick={onClick}/> : <></>}
      </div>
    </div>
  );
};
