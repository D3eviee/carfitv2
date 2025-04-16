'use client'
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FormButton } from "@/components/form-button";
import { FormLabel } from "@/components/form-label";
import { FormInput } from "@/components/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { newServiceSchaema } from "@/lib/schema";
import ModalProvider from "@/components/providers/modal-provider";
import { addNewService } from "@/app/dashboard/actions";

export function AddServiceButton({categories}:{categories:CategoriesData[]}){
  const queryClient = useQueryClient();

  // STATE FOR MANAGING OPENING MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pickedFromTime, setPickedFromTime] = useState(15)
  const timeOptions = [{time: "30min", value: 30}, {time: "45min", value: 45}, {time: "1h", value: 60}, {time: "1h 15min", value: 75},{time: "1h 30min", value: 90}, {time:  "1h 45min", value: 105}, {time: "2h", value: 120}, {time: "2h 15min", value: 135},{time: "2h 30min" , value: 150}, {time:"2h 45min" , value: 165}, {time: "3h", value: 180}, {time: "3h 15min", value: 195}, {time: "3h 30min", value: 210} , {time: "3h 30min", value: 225}, {time: "3h 45min", value: 240}, {time: "4h", value: 255}, {time: "4h 15min", value: 270},{time: "4h 30min" , value: 285}, {time:"4h 45min" , value: 300}, {time: "5h", value: 315}, {time: "5h 15min", value: 330}, {time: "5h 30min" , value: 345}, {time:"5h 45min" , value: 360}, {time:"6h" , value: 375}]

    const [choosenDurationType, setChoosenDurationType] = useState<string>("precise")
    const { register, handleSubmit, getValues, setValue, reset, formState, watch} = useForm<serviceModalProps>({
        resolver: zodResolver(newServiceSchaema),
        defaultValues: {
            name: "",
            category: "",
            price: "",
            description: "",
            durationType: "precise",
            duration: 0,
            from: 15,
            to: 30 ,
        }
    })  

    const mutation = useMutation({
        mutationFn: async () => {
            if(getValues("durationType") == "precise"){
               return await addNewService(getValues())
            }
            else {
               return await  addNewService({...getValues(), duration: getValues("to")-getValues("from")})
            }
        }, 
        onSuccess: (data) => {
          if (data) {
            queryClient.invalidateQueries({ queryKey: ["category"] });
          }
          setIsModalOpen(false);
          reset()
        },
        onError: (error) => {
          console.error("Error adding service", error);
        },
      });

    return(
      <div>
        <ModalProvider title="Add new service" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(() => mutation.mutate())}>
                        {/* SERVICE NAME INPUT */}
                        <div>
                            <div className="flex flex-row justify-between">
                                <FormLabel text="Service name"/>
                                <p className="text-[10px] text-[#999] font-normal mt-1.5">{watch('name').length} / 100</p>
                            </div>
                            <FormInput type="text" id="name" register={register} maxLength={100}/>
                            <p className="text-red-600">{formState.errors.name?.message || ""}</p>
                        </div>

                        {/* SERVICE CATEGORY AND PRICE INPUTS ROW*/}
                        <div className="flex flex-row gap-5">
                            <div>
                                <FormLabel text="Service category" />
                                <select className="border-[0.5px] border-[#E8E8E8] w-52 p-2" id="category" {...register('category')} required>
                                <option value="" disabled hidden>Wybierz kategorię</option>
                                    {categories.map((category, index)=>{
                                        return (<option key={index} value={category.id}>{category.name}</option>)
                                    })}
                                </select>
                            </div>
                            <div>
                                <div>
                                <FormLabel text="Service price"/>
                                <FormInput id="price" register={register} type="text" className="border-[0.5px] border-[#E8E8E8] w-52 p-2"/>
                                <p className="text-red-600">{formState.errors.price?.message || ""}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <FormLabel text="Description"/>
                            <textarea id="description" className="border text-sm p-2" rows={4} {...register('description')}/>
                        </div>

                        <div className="flex flex-row gap-5">
                            <div className="flex flex-col gap-1">
                                <FormLabel text="Estimated time"/>           
                                <select className="border-[0.5px] border-[#E8E8E8] w-48 p-2" id="durationType" {...register('durationType')} onChange={(e)=>{setChoosenDurationType(e.target.value)}} value={choosenDurationType}>
                                    <option value="" disabled hidden>Wybierz typ trwanie</option>
                                    <option value="precise" >Precise time</option>
                                    <option value="range">Range</option>
                                    <option value="unknown">No time assigned</option>
                                </select>
                            </div>

                            {choosenDurationType === "range" && (
                                <>
                                <div className="flex flex-col gap-1">
                                    <FormLabel text="From" />
                                    <select className="border-[0.5px] border-[#E8E8E8] w-32 p-2" id="from" {...register('from', {valueAsNumber:true})} 
                                    onChange={(e) => {
                                        setPickedFromTime(Number(e.target.value))
                                        setValue("from", Number(e.target.value))
                                }}>
                                        <option value={15}>15 min</option>
                                        {timeOptions.map((item, index) => {
                                            return <option key={index} value={item.value}>{item.time} </option>
                                        })}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <FormLabel text="To" />
                                    <select className="border-[0.5px] border-[#E8E8E8] w-32 p-2" id="to" {...register('to', {valueAsNumber:true})} 
                                    onChange={(e) => setValue("to", Number(e.target.value))}>
                                        {pickedFromTime < 30 && <option value={30}>30 min</option>}
                                        {timeOptions.map((item, index) => {
                                            if(index == 0) return null
                                            if(item.value > Number(pickedFromTime)) return <option key={index} value={item.value}>{item.time}</option>
                                            return null
                                        })}
                                    </select>
                                </div>
                                </>
                            )}

                            {choosenDurationType === "precise" && (
                                <div className="flex flex-col gap-1">
                                    <FormLabel text="Duration" />
                                    <select className="border-[0.5px] border-[#E8E8E8] w-32 p-2" id="duration" {...register('duration', {valueAsNumber:true})}>
                                        <option value={15}>15 min</option>
                                        {timeOptions.map((item, index) => (
                                            <option key={index} value={item.value}>{item.time}</option>
                                        ))}
                                    </select>
                                </div>
                            )} 
                        </div>
                        
                        {/* BUTTONS FOR CANCELING AND ADDING SERVICE */}
                        <div className="flex flex-row justify-end w-full" >
                            <div className="w-1/3 flex flex-row gap-3">
                                <FormButton label="Cancel" type="button" onClick={()=>{setIsModalOpen(false); reset()}} className="text-[#3F3F3F] bg-[#F2F2F2] hover:bg-[#E2E2E2]"/>
                                <FormButton label="Add" type="submit" className="hover:bg-[#333333]"/>
                            </div>
                        </div>
                    </form>
      </ModalProvider>
      <button 
        type="button" 
        className="bg-[#000] text-white text-sm font-normal py-2 px-3 rounded-[5px] hover:bg-[#111] hover:cursor-pointer" 
        onClick={() => setIsModalOpen(true)}
        >
            Add service
            </button>
      </div>
    )
  }

 