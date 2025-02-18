import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { businessOnboardingSchema } from "@/lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FirstStep(){
      const [error, setError] = useState<string>('')
      const router = useRouter();

      const onboardingFirstStepSchema = businessOnboardingSchema.pick({
        email: true,
        password: true,
      })
    
      type onboardingFirstStepSchema = z.infer<typeof onboardingFirstStepSchema>
    
      const {register, handleSubmit} = useForm<onboardingFirstStepSchema>({
        resolver: zodResolver(onboardingFirstStepSchema),
        defaultValues: {
          email: '',
          password: ''
        }
      });
    
      const onSubmit = async (data: onboardingFirstStepSchema) => {
        console.log(data)
      };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="inline-block text-[#333] text-[14px] mb-[5px]">Email</label>
          <input
            type="email"
            {...register('email')}
            id="email"
            placeholder="carfit@gmail.com"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
          />

          <label htmlFor="password" className="inline-block text-[#333] text-[14px] mb-[5px]">Password</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="***********"
            className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md focus:outline-[#333333]"
          /> 
          <p className="text-red-600 text-sm">{error}</p>
          </form>
  )
}



