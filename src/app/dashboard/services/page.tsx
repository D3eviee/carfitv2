import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { MoreVertical } from "lucide-react";
import { ReactNode } from "react";

export default function ServicePage() {
  return (
    <DashboardContentContainer>
      <div className="flex flex-col gap-5">
        {/*heading*/}  
        <div className="flex flex-col gap-4  py-5">
          <h1 className="text-3xl leading-4 text-[#111111] font-medium">Services</h1>
          <h2 className="text-sm text-[#555555] font-light">Add and edit services that your business offers to clients</h2>
        </div>
        {/*content*/}  
        <div className="flex flex-row gap-[20px]">
          {/*left sidebar menu*/}  
          <div className="bg-[#FFFFFF] w-[215px] max-h-fit flex flex-col gap-5  px-4 py-5 border-[0.5px] border-[#D4D4D4] rounded-lg ">
            <h3 className="text-base text-[#333] font-semibold  px-2.5">Categories</h3>
            <ul className="flex flex-col gap-2 min-h-7 list-none">
              {/* <li className="text-sm font-light text-[#555] text-center">No categories</li> */}

              <p className="bg-[#F9FAFC] leading-3 text-sm text-[#111] font-base  px-2.5 py-2.5 rounded-[5px] border-[0.5px] border-[#D4D4D4]">Wheels</p>
              <p className="leading-3 text-sm text-[#777] font-base  px-2.5 py-2 rounded-[5px] border-[0.5px] border-[#FFF]">Engine</p>
              <p className="leading-3 text-sm text-[#777] font-base  px-2.5 py-2 rounded-[5px] border-[0.5px] border-[#FFF]">Olis</p>
              <p className="leading-3 text-sm text-[#777] font-base  px-2.5 py-2 rounded-[5px] border-[0.5px] border-[#FFF]">Ventilation</p>
            </ul>
            <p className=" block text-xs text-[#F25287] font-normal px-2.5 hover:font-semibold hover:cursor-pointer">Add category</p>
          </div>
          {/*right content*/}  
          <div className="bg-[#FFFFFF] w-[647px] flex flex-col gap-5 px-4 py-10 border-[0.5px] border-[#D4D4D4] rounded-lg ">
             {/*div for aligning button to right*/}  
            <div className="w-full flex flex-row justify-end">
              <button type="button" className="bg-[#000] text-white text-sm font-normal py-2 px-3 rounded-[5px] hover:bg-[#111] hover:cursor-pointer">Add service</button>
            </div>

            {/*div for service items*/}  

            <div className="mt-5 min-h-40 px-9 flex flex-col items-center justify-center gap-12">
              {/* <p className="text-sm font-light text-[#555] text-center">No items</p> */}
              <CategorySection>
                <CategorySectionItem/>
                <CategorySectionItem/>
                <CategorySectionItem/>
                <CategorySectionItem/>
              </CategorySection>

              <CategorySection>
                <CategorySectionItem/>
                <CategorySectionItem/>
                <CategorySectionItem/>
                <CategorySectionItem/>
              </CategorySection>

              <CategorySection>
                <CategorySectionItem/>
                <CategorySectionItem/>
                <CategorySectionItem/>
                <CategorySectionItem/>
              </CategorySection>
            </div>
          </div>
        </div>
      </div>
      </DashboardContentContainer>
  );
}

function CategorySection({children}:{children: ReactNode}) {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="flex flex-col gap-0.5 border-b border-b-[#DCDCDC] pb-3">
        <h4 className="text-[#111] text-base font-medium">Category name</h4>
        <p className="text-[#333] text-xs font-light">Some small description for category.</p>
      </div>
      <div className="flex flex-col gap-2.5">
        {children}
      </div>
      
    </div>
  )
}

function CategorySectionItem() {
  return (
    <div className="w-full flex flex-row bg-[#F9FAFC] border-[0.5px] border-[#D4D4D4] rounded-[10px] overflow-hidden py-3">
      <div className="w-[6px] bg-purple-600 h-full opacity-45"/>
      {/* content */}
      <div className="w-full px-3 py-2 pr-2 flex flex-row justify-between">
        {/* right headings */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[#111] text-base font-medium">Diagnoza i wycena naprawy</h1>
          <h2 className="text-[#333] text-sm font-normal">Moving</h2>
        </div>
        {/* left details */}
        <div className="flex flex-row gap-3">
          <p className="h-full flex flex-col justify-end text-[#111] text-sm font-normal">100 PLN</p>
          <MoreVertical size={20} color="#111"/>
        </div>
      </div>
    </div>
  )
}

