"use client";
import { useState } from "react";
import ModalProvider from "@/components/providers/modal-provider";
import { addNewCategory } from "@/actions/actions";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormLabel } from "@/components/form-label";
import { FormButton } from "@/components/form-button";
import { useModalStore } from "@/lib/store";
import { FormInput } from "@/components/form-input";

export function AddCategoryButton() {
  const toggleCategoryModal = useModalStore((store) => store.toggleCategoryModal);
  const isAddCategoryModalOpen = useModalStore((store) => store.isAddCategoryModalOpen);
  const [err, setErr] = useState<string>();
  const queryClient = useQueryClient();

  const { register, handleSubmit, getValues, setValue} = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async () => await addNewCategory({ name: getValues("name") }),
    onSuccess: (data) => {
      if (data?.success) {
        setValue("name", "")
        queryClient.invalidateQueries({ queryKey: ["category"] });
        toggleCategoryModal()

      } else {
        setErr(data?.message || "Error occurred");
      }
    },
  });

  return (
    <>
      {isAddCategoryModalOpen && <ModalProvider modalTitle="Add new category">
        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit(() => mutate())}>
            <FormLabel text="Category Name" />
            <FormInput
              id="name"
              type="text"
              register={register}
              required={true}
            />

            {/* CONTOL BUTTONS */}
            <div className="flex flex-col justify-end w-full">
              <p className="text-red-600 text-sm font-normal">{err}</p>
              <div className=" w-full flex flex-row gap-3">
                <FormButton
                  label="Cancel"
                  type="button"
                  onClick={() => toggleCategoryModal()}
                />
                <FormButton label="Add" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </ModalProvider>
      }
      <p
        className=" block text-xs text-[#F25287] font-normal px-2.5 hover:font-semibold hover:cursor-pointer"
        onClick={() => (toggleCategoryModal())}
      >
        Add category
      </p>
    </>
  );
}
