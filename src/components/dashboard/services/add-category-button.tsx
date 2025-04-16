"use client";
import { useState } from "react";
import Modal from "@/components/providers/modal-provider";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormLabel } from "@/components/form-label";
import { FormButton } from "@/components/form-button";
import { addNewCategory } from "@/app/dashboard/actions";
import ModalProvider from "@/components/providers/modal-provider";

export function AddCategoryButton() {
  const queryClient = useQueryClient();
  const [err, setErr] = useState<string>(); //displaying error

  // STATE FOR MANAGING OPENING MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FORM HOOK
  const { register, handleSubmit, getValues, setValue} = useForm({
    defaultValues: {
      name: "",
    },
  });

  // PROCESSING ADDDING CATEGORY
  const { mutate } = useMutation({
    mutationFn: async () => {
      const categoryName = getValues("name")
      return await addNewCategory(categoryName)
    },
    onSuccess: (data) => {
      if (data.success) {
        setValue("name", "")
        queryClient.invalidateQueries({ queryKey: ["category"] });
        setIsModalOpen(false)
      } else {
        setErr(data?.message || "Error occurred");
      }
    },
  });

  return (
    <>
      <p className=" block text-xs text-[#F25287] font-normal px-2.5 hover:font-semibold hover:cursor-pointer" onClick={()=>setIsModalOpen(true)}>Dodaj kategorię</p>

      <ModalProvider title="Dodaj kategorię" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
            <p className="ml-0.5 text-red-600 text-xs font-normal my-2">{err}</p>

            {/* ADD BUTTON */}
            <FormButton label="Add" type="submit" className="bg-[#2785F1] hover:bg-[#1674F0] mt-0" />
          </form>
        </div>
      </ModalProvider>
    </>
  );
}