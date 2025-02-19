import Image from 'next/image';
import oklejanie from "../../../public/service_image_1.jpg"
import { ChevronRight } from 'lucide-react';
import { businessOnboardingSchema } from '@/lib/schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function OnboardingCategory({ onClick = () => {} }){
    //DEFINING FORM TYPES
    const onboardingCategory = businessOnboardingSchema.pick({
      businessCategory: true
    });
  
    type OnboardingCategory = z.infer<typeof onboardingCategory>;
  
    //DEFINING USEFORM HOOK
    const { register, handleSubmit, formState, trigger } =
      useForm<OnboardingCategory>({
        resolver: zodResolver(onboardingCategory),
        defaultValues: {
          businessCategory: ""
        },
      });
  
    //FUNCTION FOR HANDLING FORM
    const onSubmit = async (data: OnboardingCategory) => {
      console.log(data)
      const isValid = await trigger()
      if(isValid) onClick()
      
    };


  return(
      <form onSubmit={()=>{onSubmit}} >
        <h4 className='text-sm text-[#777777] font-extralight'>Categories</h4>

        <div className='box-border max-h-[305px] overflow-scroll mt-3 '>
          <CategoryItem onClick={onClick}/>
        </div>
      </form>    
  )
}

function CategoryItem({onClick = () => {}}) {
  return(
    <label className="box-border px-1 py-3 flex justify-between items-center border-b-[0.5px] border-[#CCCCCC]" onClick={onClick}>
      <input type="radio" name="option" className='hidden' value="CAR SERV3CE"/>
      <div className="flex gap-3 items-center">
        <Image src={oklejanie} alt="Category image" height={45} width={45} className='aspect-square rounded-full'/>
        <h3 className="m-0 p-0 text-sm font-normal text-[#333333]">Wheel Change</h3>
      </div>
      <ChevronRight strokeWidth="0.5px" color='#333333'/>
    </label>
  )
}