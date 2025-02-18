import { Flag } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function ThirdStep(){

  const {register} = useForm()

  return(
      <form onSubmit={()=>{}} >
         <label htmlFor="business-name" className="inline-block text-[#333] text-[14px] mb-[5px]">Business name</label>
          <input
            {...register('business-name')}
            type="text"
            id="business-name"
            placeholder="Tesla Motosport"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
          />

          <label htmlFor="business-owner" className="inline-block text-[#333] text-[14px] mb-[5px]">Business owner</label>
          <input
            type="text"
            {...register('email')}
            id="business-owner"
            placeholder="Jacky Macky"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
          />

            <label htmlFor="business-owner" className="inline-block text-[#333] text-[14px] mb-[5px]">Businnes phone</label>
              <input
                type="text"
                {...register('phone')}
                id="business-owner"
                placeholder="5140322233"
                className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
            />
          

            <div className="flex gap-2 items-start">
                <input type="checkbox" id="agreements" className='w-5 h-5'/>
                <div className='gap-1'>
                    <h3 className="text-xs text-[#333333]"><label htmlFor="agreements">I accept the policy and confirm I read the list of rules.</label>
                    <span className="ml-2 text-xs text-[#777777]">Reqired</span></h3>
                </div>
            </div>
      </form>    
  )
}