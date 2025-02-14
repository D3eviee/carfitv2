import Image from "next/image";
import profile_picture from '../../../../../public/profile_picture.jpeg'
import car_image from '../../../../../public/car_image.png'
import { userAuth } from "@/lib/session";
import { HomeIcon, Pen } from "lucide-react";
import Modal from "@/components/modal";


export default async function Profile() {

  const { id, name, email, image, createdAt} = await userAuth()

  return (
    <>
    <div className="grid gap-6 mt-24 mx-[350px]">
      <div className="flex justify-between border-[0.5px] border-[#CCCCCC] bg-[#F6F5F2] rounded-xl py-8 px-8">
        <div className="flex items-center">
          <Image src={profile_picture} alt="Profile picture" height={140} width={140} className="rounded-[50%] shadow-[0px_2px_4px_1px_#999999]"/>
          <div className="ml-6">
            <h1 className="text-[#333333] text-2xl font-medium">{name} Roszkowski</h1>
            <p className="text-[#777] text-base font-normal"  >{email}</p>
          </div>
        </div>
        <div className="flex gap-1 box-border items-center bg-[#333333] text-white px-3 py-1 rounded-[7px] h-[35px] hover:bg-[#444444]">
          <p className="text-[15px] font-medium">Edit profile</p>
        </div>
      </div>

      <div className=" w-full border bg-[#F6F5F2] rounded-xl py-8 px-8">
        <h2 className="text-[#333333] text-xl font-medium mb-7">Your cars</h2>
        <div className="border bg-[#FFFFFF] w-[300px] rounded-xl py-8 px-8">
        </div>
      </div>
    </div>
    </>
  );
}
