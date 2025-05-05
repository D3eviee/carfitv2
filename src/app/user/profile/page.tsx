'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { getUserProfileData, putUserImage, updateUserData } from "../actions";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import ModalProvider from "@/components/providers/modal-provider"
import { useState } from "react"
import { FormLabel } from "@/components/form-label";
import { FormInput } from "@/components/form-input";
import { useForm } from "react-hook-form";


export default function Profile(){
  const queryClient = useQueryClient()
  const validFileTypes = ["image/jpg", "image/jpeg", "image/png"]
  const [open, setIsOpen] = useState(false)
  const [error, setError] = useState("")

  const {data: userProfileData, status: userProfileDataStatus} = useQuery({
    queryKey: ["userProfileData"],
    queryFn: async () => {
      return await getUserProfileData()
    }
  })

    const {mutate, error:mutationError, isPending} = useMutation({
      mutationKey: ["uploadImage"],
      mutationFn: async (data:FormData) => {
        try {
          await fetch("/api/uploadImage", {
              method: "POST",
              body: data
          })
  
          return 
        } catch (err) {
            return { err }
        }
      },
      onSuccess: () => queryClient.invalidateQueries({queryKey: ["userProfileData"]})
    })

    const {mutate:handleForm} = useMutation({
      mutationKey: ["edit"],
      mutationFn: async () => {
        const data = getValues()
        updateUserData(data)
      },
      onSuccess: () => queryClient.invalidateQueries({queryKey: ["userProfileData"]})
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

    const {register, getValues} = useForm()

    if(userProfileDataStatus == "pending") return <p>Pending</p>
    if(userProfileDataStatus == "error") return <p>Error</p>


  return (
    <div className='flex flex-col gap-5 justify-center w-3/4 mx-auto'>
      <div className="flex flex-row justify-between items-start gap-5 p-5 rounded-md bg-[#F9FAFC] border border-[#F2F4F8]">
        <div className="w-full flex flex-row gap-5">
          <div className="flex justify-center items-center rounded-full w-[150px] h-[150px] shadow-md">
            <Image
              src={userProfileData.image}
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-full"
              alt="Profile"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-[#111] font-semibold">{userProfileData.name}</h1>
            <div className="flex flex-row items-center gap-3">
              <Mail size={18} color="#111" strokeWidth={1}/>
              <h2 className="text-md text-[#111] font-light">{userProfileData.email}</h2>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Phone size={18} color="#111" strokeWidth={1}/>
              <h2 className="text-md text-[#111] font-light">{userProfileData.phone}</h2>
            </div>
          </div>
        </div>
          <div 
            className="bg-slate-100 py-1 px-2 text-black hover:cursor-pointer"
            onClick={() => setIsOpen(true)}
          >Edytuj</div>
        </div>
        
      <div className="flex flex-row cols-2 gap-5">
       <div className="w-full border p-3 rounded">
        <h1 className="text-md text-[#333] font-normal">Wizyty</h1>
        <h2 className="text-3xl text-[#333] font-semibold">0</h2>
       </div>
       <div className="w-full border p-3 rounded">
        <h1 className="text-md text-[#333] font-normal">Wydane środki</h1>
        <h2 className="text-3xl text-[#333] font-semibold">0 PLN</h2>
       </div>
       
      </div>
      <ModalProvider open={open} onClose={() => setIsOpen(false)} title="Edit profile">
      <div className="flex gap-5 items-center rounded-full w-[75] h-[75px] shadow-md mb-7">
            <Image
              src={userProfileData.image}
              width={90}
              height={90}
              className="w-full h-full object-cover rounded-full"
              alt="Profile"
            />

            <label className="text-white rounded border-none outline-none h-[30px] text-sm px-2 border bg-[#111] hover:bg-[#333] hover:cursor-pointer inline-flex items-center">
              Change
              <input 
                type="file" 
                hidden 
                onChange={handleUpload}
                disabled={isPending}
              />
            </label>
          {error && <p className="mt-5 text-red-600 text-sm font-extralight">{error}</p>}
          {mutationError && <p className="mt-5 text-red-600 text-sm font-extralight">{mutationError.message}</p>}
          
        </div>

        <div className="flex flex-col mb-7">
          <FormLabel text="Full name"/>
          <FormInput type="text" id="name" register={register} defaultValue={userProfileData.name}/>
        </div>

        <div className="flex flex-col">
          <FormLabel text="Phone"/>
          <FormInput type="text" id="phone" register={register} defaultValue={userProfileData.phone} />
        </div>

        <div className="w-full flex justify-end mt-5">
          <div 
            className="bg-[#111] text-white py-1 px-2 rounded hover:cursor-pointer"
            onClick={() => {setIsOpen(false); handleForm()}}  
          >
          Save
          </div>
          
        </div>
      </ModalProvider>
    </div>
  )
}