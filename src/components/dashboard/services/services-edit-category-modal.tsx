'use client'
import { editCategory } from "@/app/dashboard/actions";
import { FormButton } from "@/components/form-button";
import { FormLabel } from "@/components/form-label";
import ModalProvider from "@/components/providers/modal-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type ServiecEditCategoryModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  categoryId: string
  categoryName: string
}

export default function ServiecEditCategoryModal({open, onClose, categoryId, categoryName}:ServiecEditCategoryModalProps) {
    const queryClient = useQueryClient();
    const {register, handleSubmit, getValues, setValue} = useForm({
      defaultValues: {
        name: categoryName,
      }
    });

    const { mutate } = useMutation({
        mutationFn: async () => {
          const categoryName = getValues("name")
          return await editCategory(categoryId, categoryName)
        },
        onSuccess: (data) => {
          if (data.success) {
            setValue("name", "")
            queryClient.invalidateQueries({ queryKey: ["category"] });
            onClose()
          }
        }
      });

      return (
      <ModalProvider title="Dodaj kategorię" open={open} onClose={()=> {onClose()}}  >
        <div className="flex flex-col gap-4">
           <form onSubmit={handleSubmit(() => mutate())} className="flex flex-col">
             <FormLabel text="Nazwa kategorii" />
             <input
               id="name"
               type="text"
               {...register("name")}
               className="border-[0.5px] border-[#D4D4D4] w-full px-2 py-1 text-[#111] text-sm rounded-md focus:outline-[#999]"
             />
 
             {/* ERROR */}
             <p className="ml-0.5 text-red-600 text-xs font-normal my-2"></p>
 
             {/* ADD BUTTON */}
             <FormButton label="Done" type="submit" className="bg-[#2785F1] hover:bg-[#1674F0] mt-0" />
           </form>
         </div>
      </ModalProvider>
      )
}