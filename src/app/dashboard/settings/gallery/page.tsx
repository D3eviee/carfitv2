'use client'
import Link from 'next/link';
import DashboardContentContainer from '@/components/dashboard/dashboard-content-container';
import { cn } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBusinessImages } from '../../actions';

export default function SettingsPage() {
  const queryClient = useQueryClient()
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"]
  const [error, setError] = useState("")

  const {data: userImages, status: userImagesStatus} = useQuery({
    queryKey: ["getUserImages"],
    queryFn: async () => {
      return await getBusinessImages()
    }
  })

  console.log(userImages)

  const {mutate, error:mutationError, isPending} = useMutation({
    mutationKey: ["uploadGalleryImage"],
    mutationFn: async (data:FormData) => {
      try {
        await fetch("/api/uploadGalleryImage", {
            method: "POST",
            body: data
        })

        return 
      } catch (err) {
          return { err }
      }
    },
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["getUserImages"]})
  })

  const handleUpload = async (e) => {
    const file = e.target.files[0]

    if (!validFileTypes.includes(file.type)) {
      setError("File must be JPG/PNG format")
      return
    }

    const form = new FormData()
    form.append('image', file)

    mutate(form)
  }

  if(userImagesStatus == "pending") return <p>Pending</p>
  if(userImagesStatus == "error") return <p>Error</p>

  return (
    <DashboardContentContainer>
      <div className="flex items-center gap-[20px]">
        <Link href="/dashboard/settings" className="bg-[#111] p-[10px] flex justify-center items-center rounded-[90px] bg-[#] shadow-[0px_0x_2px_0px_#33333333] hover:bg-[#333] hover:cursor-pointer">
          <ArrowLeft color="#FFFFFF" size={20} strokeWidth={2} />
        </Link>
        <div className="px-[7px] py-[15px] rounded-[5px] border-1 border-[#D4D4D4] text-[13px]">
        <p className="m-0 p-0 font-normal text-[#333333]"><span className="m-0 p-0 font-light text-[#777777]">Dni pracy | </span>Godziny pracy</p>
        </div>
      </div>
      
      <div className="mt-[30px] flex flex-row gap-[30px]">
        <div className="h-fit min-w-52 px-[15px] py-[20px] border-[0.5px] border-[#D4D4D4] ml-[70px] rounded-[10px]">
          <h2 className="m-0 mb-[20px] font-normal text-medium text-[#333333]">Galeria</h2>
          <div className="flex gap-[10px] flex-col">
            <p 
            className={cn("text-sm font-light text-[#555555] m-0 px-[8px] py-[10px] rounded-md  hover:cursor-pointer",  
            true == true ? "bg-[#111] text-white font-medium" : "hover:bg-[#F2F4F8]")}
            >
              Galeria
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] w-7/1 min-w-[550px]">
          <div className="p-[20px] border-[0.5px] border-[#D4D4D4] rounded-[5px]">
            <h2 className="m-0 p-0 mb-[5px] text-lg font-medium text-[#333333]">Galeria</h2>
            <p className="m-0 p-0 text-[13px] font-light text-[#777777]">Edytuj i zmieniaj zdjęcia widoczne na twoim profilu</p>
          </div>

          <div className="py-[30px] justify-center px-[50px] border-[0.5px] border-[#D4D4D4] rounded-[10px] shadow-[0px_1px_2px_0px_#ACACAC30]">
            <label 
              className="flex justify-center items-center w-full border-[#f2f2f2] border-dashed h-[50px] bg-slate-200 rounded hover:cursor-pointer" 
              htmlFor='imageInput'
            >
              Upload images
            </label>
            <input id="imageInput" type="file" name="imageInput" hidden onChange={handleUpload}/>   

            {error && <p className="mt-5 text-red-600 text-sm font-extralight">{error}</p>}
            {userImages.length == 0 && <p>No images added. Add some photos.</p>}

            <div className='mt-7 flex flex-col gap-4'>
              {(userImages && userImages.length > 0) && userImages.map(photo => (
                <div key={photo.id} className='w-full flex flex-row justify-between items-center'>
                  <div className='w-[180px] h-[120px] rounded overflow-hidden'>
                    <Image src={photo.photoUrl} key={photo.photoUrl} alt="image" width={250} height={250}/>
                  </div>

                  <button className='h-fit bg-red-600 text-white px-2 py-1 rounded shadow-black'>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardContentContainer>
  );
}