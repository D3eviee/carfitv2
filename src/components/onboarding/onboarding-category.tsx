import Image from 'next/image';
import oklejanie from "../../../public/service_image_1.jpg"
import { ChevronRight } from 'lucide-react';
import { businessOnboardingSchema } from '@/lib/schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOnboardingStore } from '@/lib/store';

export default function OnboardingCategory({ onClick = () => {} }){
    //DEFINING FORM TYPES
    const onboardingCategory = businessOnboardingSchema.pick({
      businessCategory: true
    });
  
    type OnboardingCategory = z.infer<typeof onboardingCategory>;
    
    let data:OnboardingCategory = {businessCategory: ""};
    const setData = useOnboardingStore((state)=>state.setData)
  
    //FUNCTION FOR HANDLING FORM
    const handleClick = (categoryName:string) => {
      data.businessCategory = categoryName
      setData(data)
      onClick()
    };

  return(
      <div>
        <h4 className='text-sm text-[#777777] font-extralight'>Categories</h4>

        <div className='box-border max-h-[305px] overflow-scroll mt-3 '>
          <CategoryItem categoryName="Wheel change" onClick={()=>handleClick("Wheel change")}  />
          <CategoryItem categoryName="Car service" onClick={()=>handleClick("Car service")}/>
          <CategoryItem categoryName="Wheel change" onClick={()=>handleClick("Wheel change")}  />
          <CategoryItem categoryName="Car service" onClick={()=>handleClick("Car service")}/>
        </div>
      </div>    
  )
}

type CategoryItemProps = {
  categoryName: string;
  onClick?: () => void;
};

function CategoryItem({categoryName, onClick = () => {}}:CategoryItemProps) {
  return(
    <div className="box-border px-1 py-3 flex justify-between items-center border-b-[0.5px] border-[#CCCCCC] hover:cursor-pointer" onClick={()=>onClick()}>
      <div className="flex gap-3 items-center">
        <Image src={oklejanie} alt="Category image" height={45} width={45} className='aspect-square rounded-full'/>
        <h3 className="m-0 p-0 text-sm font-normal text-[#333333]">{categoryName}</h3>
      </div>
      <ChevronRight strokeWidth="0.5px" color='#333333'/>
    </div>
  )
}