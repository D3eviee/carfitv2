"use client";
import Image from "next/image";
import login_image from "../../../../../public/login_image.jpg";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FirstStep from "@/components/onboarding/first-step";
import SecondStep from "@/components/onboarding/second-step";
import ThirdStep from "@/components/onboarding/third-step";
import ForthStep from "@/components/onboarding/forth-step";
import FifthStep from "@/components/onboarding/fifth-step";
import { OnboardingNav } from "@/components/onboarding/onboarding-nav";
import { NextStepButton } from "@/components/onboarding/next-step-button";
import { useState } from "react";
import FormHeader from "@/components/form-header";

export default function Onboardoarding() {
  const [activePage, setActivePage] = useState<number>(0)
  let activeForm = <FirstStep />

  const formHeadings = [
    {title: "Welcome to CarFit" , subtitle: "Create account for your business and let it grow"},
    {title: "What’s the type of your business" , subtitle: "Select the category best represents the services you provide"},
    {title: "Business Information" , subtitle: "Provide information about yourself and your business"},
    {title: "Adress " , subtitle: "Where your business is located?"},
    {title: "Your Working Days" , subtitle: "Let clients know when they can book a visit"},
  ]

  switch (activePage) {
    case 0:
      activeForm = <FirstStep />
      break;
    case 1:
      activeForm = <SecondStep onClick={() => setActivePage((prev) => prev + 1)}/>
      break;
    case 2:
      activeForm = <ThirdStep />
      break;
    case 3:
      activeForm = <ForthStep />
      break;
    case 4:
      activeForm = <FifthStep />
      break;
    default:
      activeForm = <FirstStep />
  }

  return (
    <div className="w-full h-screen flex">
     {/*LEFT SIDE FORM*/}
      <div className="w-1/2 bg-[#FDFCFF] text-white flex flex-col items-center justify-center">
        {/*BACK BUTTON*/}
        <Link href="/business" className="absolute left-[80px] top-[40px]">
          <div className=" bg-[#111] rounded-md hover:bg-[#222222] border p-1">
            <ArrowLeft color="#FFFFFF" className="size-7"/>
          </div>
        </Link>

        {/*FORM BOX*/}
        <div className="w-[380px] max-h-[63s0px] bg-[#FFFFFF] flex flex-col rounded-xl shadow-[0px_0px_35px_5px_#D4D4D4] pb-[50px]">
          {activePage == 0 ? <> </> : <OnboardingNav onClick={() => setActivePage((prev) => prev - 1)} />}
          {/*NAVIGATION TAB FOR FORM STEPS*/}
          <FormHeader
            title={formHeadings[activePage].title}
            subtitle={formHeadings[activePage].subtitle}
          />

          {/*FORM WITH PROGRESS BUTTON*/}
          <div className="px-10">
            {activeForm}
            {activePage == 1 ? <> </> : <NextStepButton onClick={() => setActivePage((prev) => prev + 1)}/>}
          </div>

          {/*SWITCH TO LOGIN IF ACCOUNT EXISTS*/}
          {activePage != 0 ? <> </> : 
            <p className="text-center text-[#333333] text-xs font-light pt-5">Already have an account? 
            <Link href='/sign-in'><span className="text-blue-900 font-semibold"> Login</span></Link>
            </p>
          }
        </div>
      </div>

      {/*RIGHT SIDE IMAGE*/}
      <div className="w-1/2 text-white">
        <Image src={login_image} alt="login image" className="h-full object-cover"/>
      </div>
    </div>
  );
}
