'use client'
import Image from "next/image";
import login_image from "../../../../../public/login_image.jpg"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/form-header";
import {useForm} from 'react-hook-form'
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function Onboardoarding() {

  const [error, setError] = useState<string>('')
  const router = useRouter();

  interface ClientOnboadringData  {
    name: string
    email: string
    password: string
    phone: string
  }

  const {register, handleSubmit} = useForm<ClientOnboadringData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: ''
    }
  });

  const onSubmit = async (data: ClientOnboadringData) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {...data, password:hashedPassword}

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();

      if (response.ok) {
       
        router.push('/')
      } else if(responseData.status == 409){
        setError(responseData.error)
      }else{
        setError(responseData.error)
      }

    } catch (error) {
      setError("There was a problem with your registration");
    }
  };
  

  return (
    <div className="w-full h-screen flex">
      <Link href="/" className="absolute left-[80px] top-[40px]">
        <div className=" bg-[#111] rounded-md hover:bg-[#222222] border p-1">
          <ArrowLeft color="#FFFFFF" className="size-7" />
        </div>
      </Link>

      <div className="w-1/2 bg-[#FDFCFF] text-white flex flex-col items-center justify-center">
        <div className="w-[380px] bg-[#FFFFFF] flex flex-col px-[45px] py-[75px] gap-[30px] rounded-xl shadow-[0px_0px_35px_5px_#D4D4D4]">

          <FormHeader title="Wellcome to CarFit" subtitle="Create an account"/>

          <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="inline-block text-[#333] text-[14px] mb-[5px]">Full name</label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="Jacky Macky"
              className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
            />

          <label htmlFor="phone" className="inline-block text-[#333] text-[14px] mb-[5px]">Phone</label>
            <input
              type="string"
              {...register('phone')}
              id="email"
              placeholder="111111222"
              className="border-[0.5px] border-[#CCCCCC] w-full px-[7px] py-[5px] text-[#111] text-sm rounded-md mb-[15px] focus:outline-[#333333]"
            />

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

          <button className="w-full flex bg-[#111111] py-2 justify-center items-center gap-3 rounded-[7px] font-medium text-sm mt-[25px]">Create an account</button>  
          </form>

          <p className="text-red-600 text-sm">{error}</p>
        
          <div>
            <p className="text-xs text-[#333] text-pretty font-extralight tracking-wide">By clicking "Log in" you acknowledge you have read, understood and agree for our 
              <span className="text-xs font-normal text-[#333]"> Policy and Terms
            </span></p>
              <p className="mt-[25px] text-center text-[#333333] text-xs font-light">Already have an account? 
                <Link href='/sign-in'><span className="text-blue-900 font-semibold"> Login</span></Link>
              </p>
          </div>

        
    </div>
    </div>
      <div className="w-1/2 text-white"> 
      <Image src={login_image} alt="login image" className="h-full object-cover"/>
      </div>
    </div>
  );
}
