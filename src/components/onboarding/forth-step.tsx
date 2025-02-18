import { useForm } from 'react-hook-form';

export default function ForthStep(){

    const {register} = useForm()

  return(
      <form onSubmit={()=>{}} >
        <label htmlFor="town" className="inline-block text-[#333] text-[14px] mb-[5px]">Town</label>
          <input
            {...register('business-name')}
            type="text"
            id="business-name"
            placeholder="Poznań"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
          />

          <label htmlFor="zipcode" className="inline-block text-[#333] text-[14px] mb-[5px]">Zip-code</label>
          <input
            {...register('business-name')}
            type="text"
            id="zipcode"
            placeholder="Zip-code"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
          />

          <label htmlFor="district" className="inline-block text-[#333] text-[14px] mb-[5px]">District</label>
          <input
            {...register('business-name')}
            type="text"
            id="district"
            placeholder="District"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
          />

          <label htmlFor="street" className="inline-block text-[#333] text-[14px] mb-[5px]">Street</label>
          <input
            {...register('business-name')}
            type="text"
            id="street"
            placeholder="Street"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
          />

      </form>    
  )
}