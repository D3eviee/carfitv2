"use client";
import Image from "next/image"
import Link from "next/link"
import login_image from "../../../../../public/login_image.jpg";
import { ArrowLeft } from "lucide-react";
import { OnboardingNav } from "@/components/onboarding/onboarding-nav";
import { useState } from "react";
import FormHeader from "@/components/form-header";
import OnboardingAdress from "@/components/onboarding/onboarding-address";
import OnboardingBusienssInformation from "@/components/onboarding/onboarding-business-info";
import OnboardingWorkingDays from "@/components/onboarding/onboarding-working-days"
import OnboardingEmail from "@/components/onboarding/onboarding-email";
import OnboardingCategory from "@/components/onboarding/onboarding-category";

export default function Onboardoarding() {
  const [activePage, setActivePage] = useState<number>(0)

  const formHeadings = [
    {title: "Welcome to CarFit" , subtitle: "Create account for your business and let it grow"},
    {title: "What’s the type of your business" , subtitle: "Select the category best represents the services you provide"},
    {title: "Business Information" , subtitle: "Provide information about yourself and your business"},
    {title: "Adress " , subtitle: "Where your business is located?"},
    {title: "Your Working Days" , subtitle: "Let clients know when they can book a visit"},
  ]

  return (
      <div className="w-full h-screen flex">
      {/*LEFT SIDE FORM*/}
        <div className="w-1/2 bg-[#FDFCFF] text-white flex flex-col items-center justify-center">
          {/*BACK BUTTON*/}
          <Link href="/business" className="absolute left-[40px] top-[40px]">
            <div className=" bg-[#111] rounded-md hover:bg-[#222222] border p-1">
              <ArrowLeft color="#FFFFFF" className="size-7"/>
            </div>
          </Link>

          {/*FORM BOX*/}
          <div className="w-[380px] max-h-[63s0px] bg-[#FFFFFF] flex flex-col rounded-xl shadow-[0px_0px_35px_5px_#D4D4D4] pb-[50px]">
            {/*FORM NAVIGATION*/}
            {activePage !== 0 && <OnboardingNav onClick={() => setActivePage((prev) => prev - 1)} />}
            {/*FORM HEADER*/}
            <FormHeader title={formHeadings[activePage].title} subtitle={formHeadings[activePage].subtitle}/>
            {/*FORM*/}
            <div className="px-10">
                {activePage == 0 && <OnboardingEmail onClick={() => setActivePage((prev) => prev + 1)}/>}
                {activePage == 1 && <OnboardingCategory onClick={() => setActivePage((prev) => prev + 1)}/> }
                {activePage == 2 &&  <OnboardingBusienssInformation onClick={() => setActivePage((prev) => prev + 1)} />}
                {activePage == 3 && <OnboardingAdress onClick={() => setActivePage((prev) => prev + 1)} /> }
                {activePage == 4 && <OnboardingWorkingDays/>}
            </div>
          </div>

        </div>

        {/*RIGHT SIDE IMAGE*/}
        <div className="w-1/2 text-white">
          <Image src={login_image} alt="login image" className="h-full object-cover"/>
        </div>
      </div>
  );
}
