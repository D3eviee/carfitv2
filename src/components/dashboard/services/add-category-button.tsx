'use client'
import { useState } from "react"
import { createPortal } from "react-dom"
import { DashboardAddCategoryModal } from "../dashboard-add-category-modal"

export function AddCategoryButton(){
    const [isCreatingCategory, setIsCreatingCategory] =  useState<Boolean>(false)
  
    return(
      <>
        {isCreatingCategory && createPortal(<DashboardAddCategoryModal onClick={()=>{setIsCreatingCategory(false)}}/>, document.body)}
        <p className=" block text-xs text-[#F25287] font-normal px-2.5 hover:font-semibold hover:cursor-pointer" onClick={()=> setIsCreatingCategory(true)}>Add category</p>
      </>
    )
  }