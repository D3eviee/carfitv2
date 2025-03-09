import { X } from "lucide-react"
import { FormLabel } from "../form-label"
import { FormInput } from "../form-input";
import { FormButton } from "../form-button"
import { addNewCategory } from "@/actions/actions";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";

type Props = { onClick?: (f:void) => void;};
export const DashboardAddCategoryModal = ({ onClick = () => {} }: Props) => {
    const [err, setErr] = useState<string>()

    const queryClient = useQueryClient()

    const {register, handleSubmit, getValues} = useForm({
        defaultValues: {
            name: ""
        }
    })

    const { mutate } = useMutation({
        mutationFn: async () => await addNewCategory({ name: getValues("name") }),
        onSuccess: (data) => {
            if (data?.success) {
                queryClient.invalidateQueries({ queryKey: ["category"] });
                onClick();
            } else {
                setErr(data?.message || "Error occurred")
            }
        },
    });

    return (
        <div>
            <div className="absolute top-0 bg-black opacity-40 w-full h-full z-20"/>
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[350px] bg-slate-50 z-20 rounded-lg">
                <div className="p-4 flex items-center justify-center border-b border-slate-300">
                    <h1 className="font-medium text-sm">Create category</h1>
                    <X className="ml-auto cursor-pointer" onClick={()=>{onClick()}} size={20}/>
                </div>

                <div className="p-8 flex flex-col gap-4">
                        <form onSubmit={handleSubmit(() => mutate())}>
                            <FormLabel text="Category Name"/>
                            <FormInput id="name" type="text" register={register} required={true}/>

                            {/* CONTOL BUTTONS */}
                            <div className="flex flex-col justify-end w-full" >
                                <p className="text-red-600 text-sm font-normal">{err}</p>   
                                <div className=" w-full flex flex-row gap-3">
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
