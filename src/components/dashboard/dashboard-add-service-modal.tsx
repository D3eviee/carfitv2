
import { X } from "lucide-react"
import { FormInput } from "../form-input"
import { useForm } from "react-hook-form"
import { FormLabel } from "../form-label"
import { FormButton } from "../form-button"
import { addNewService, getServicesData } from "@/actions/actions"
import {useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type Props = { 
    onClick?: (f:void) => void;
    //serviceId: string;
};

export const DashboardAddServiceModal = ({ onClick = () => {} }: Props) => {

    const queryClient = useQueryClient()

    const {data} = useQuery({
        queryKey: ['formCategories'],
        queryFn: getServicesData
    })

    const [choosenDurationType, setChoosenDurationType] = useState<string>("precise")

    const { register, handleSubmit, getValues} = useForm<serviceModalProps>({
        defaultValues: {
            name: "",
            category: "",
            price: "",
            description: "",
            durationType: "precise",
            duration: "",
            from: "",
            to: "" ,
        }
    })  


    const mutation = useMutation({
        mutationFn: async () => addNewService(getValues()),
        onSuccess: (data) => {
            console.log(data)
          if (data) {
            queryClient.setQueryData(['category'], data);
          }
          onClick();
        },
        onError: (error) => {
          console.error("Error adding category", error);
        },
      });

    return (
        <div>
            <div className="absolute top-0 bg-black opacity-40 w-full h-full z-20"/>
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-1/3 h-2/3 bg-slate-50 z-20 rounded-lg">
                <div className="p-4 flex items-center justify-center border-b border-slate-300">
                    <h1 className="font-medium text-sm">Add new service</h1>
                    <X className="ml-auto cursor-pointer" onClick={()=>{onClick()}} size={20}/>
                </div>

                <div className="p-8">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(() => mutation.mutate())}>
                        <div>
                            <FormLabel text="Service name"/>
                            <FormInput type="text" id="name" register={register}/>
                        </div>

                        <div className="flex flex-row gap-5">
                            <div>
                                <FormLabel text="Service category" />
                                <select className="border-[0.5px] border-[#E8E8E8] w-52 p-2" id="category" {...register('category')} defaultValue={""} required>
                                <option value="" disabled hidden>Wybierz kategorię</option>
                                    {data?.map((category, index)=>{
                                        return (<option key={index} value={category.id}>{category.name}</option>)
                                    })}
                                </select>
                            </div>
                            <div>
                                <div>
                                <FormLabel text="Service price"/>
                                <FormInput id="price" register={register} type="text" className="border-[0.5px] border-[#E8E8E8] w-52 p-2"/>
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
                                    <option value="precise" >Precise time</option>
                                    <option value="range">Range</option>
                                    <option value="unknown">No time assigned</option>
                                </select>
                            </div>

                            {choosenDurationType === "range" && (
                                <>
                                <div className="flex flex-col gap-1">
                                    <FormLabel text="From" />
                                    <select className="border-[0.5px] border-[#E8E8E8] w-32 p-2" id="from" {...register('from')}>
                                    <option>Category 1</option>
                                        <option>Category 2</option>
                                        <option>Category 3</option>
                                        <option>Category 4</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <FormLabel text="To" />
                                    <select className="border-[0.5px] border-[#E8E8E8] w-32 p-2" id="to" {...register('to')}>
                                        <option>Category 1</option>
                                        <option>Category 2</option>
                                        <option>Category 3</option>
                                        <option>Category 4</option>
                                    </select>
                                </div>
                                </>
                            )}

                            {choosenDurationType === "precise" && (
                                <div className="flex flex-col gap-1">
                                    <FormLabel text="Duration" />
                                    <select className="border-[0.5px] border-[#E8E8E8] w-32 p-2" id="duration" {...register('duration')}>
                                        <option>Category 1</option>
                                        <option>Category 2</option>
                                        <option>Category 3</option>
                                        <option>Category 4</option>
                                    </select>
                                </div>
                            )} 
                        </div>
                        
                        {/* CONTOL BUTTONS */}
                        <div className="flex flex-row justify-end w-full" >
                            <div className="w-1/3 flex flex-row gap-3">
                                <FormButton label="Cancel" type="button" onClick={()=>{onClick()}}/>
                                <FormButton label="Add" type="submit"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
