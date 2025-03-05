import { X } from "lucide-react"
import { FormLabel } from "../form-label"
import { FormInput } from "../form-input";
import { FormButton } from "../form-button"
import { addNewCategory } from "@/actions/actions";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Props = { onClick?: (f:void) => void;};
export const DashboardAddCategoryModal = ({ onClick = () => {} }: Props) => {

    const queryClient = useQueryClient()

    const {register, handleSubmit, getValues} = useForm({
        defaultValues: {
            name: ""
        }
    })

    const mutation = useMutation({
        mutationFn: async () => addNewCategory({ name: getValues("name") }),
        onSuccess: (data) => {
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
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[350px] bg-slate-50 z-20 rounded-lg">
                <div className="p-4 flex items-center justify-center border-b border-slate-300">
                    <h1 className="font-medium text-sm">Create category</h1>
                    <X className="ml-auto cursor-pointer" onClick={()=>{onClick()}} size={20}/>
                </div>

                <div className="p-8 flex flex-col gap-4">
                        <form onSubmit={handleSubmit(() => mutation.mutate())}>
                            <FormLabel text="Category Name"/>
                            <FormInput id="name" type="text" register={register} required={true}/>

                            {/* CONTOL BUTTONS */}
                            <div className="flex flex-row justify-end w-full" >
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
