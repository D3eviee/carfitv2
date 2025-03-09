'use client'
import { useState } from "react"
import { createPortal } from "react-dom"
import { DashboardAddServiceModal } from "../dashboard-add-service-modal"

export function AddServiceButton(){
    const [isCreatingService, setIsCreatingService] =  useState<Boolean>(false)
    return(
      <>
        {isCreatingService && createPortal(<DashboardAddServiceModal onClick={()=>{setIsCreatingService(false)}} />, document.body)}
        <button type="button" className="bg-[#000] text-white text-sm font-normal py-2 px-3 rounded-[5px] hover:bg-[#111] hover:cursor-pointer" onClick={()=>{setIsCreatingService(true)}}>Add service</button>
      </>
    )
  }

 