"use client";
import { MoreVertical, Pen, TrashIcon } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/app/dashboard/actions";
import { useState } from "react";
import ServiecEditCategoryModal from "./services-edit-category-modal";

export default function ServicesCategorySidebarItem({category}: {category: CategoriesData}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: string) => await deleteCategory(id),
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });

  return (
    <>
    <li key={category.id} className="w-full leading-3 text-sm text-[#111] font-base flex flex-row justify-between items-center">
      {category.name}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <MoreVertical color="#D4D4D4" size={15} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-[#FFFFFF] flex flex-col p-1 gap-0.3 border-[0.5px] border-gray-200 shadow-[0px_0px_0px_1px_#D4D4D480] rounded"
            align="end"
            sideOffset={3}
          >
            <DropdownMenu.Item 
              className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer"
              onClick={() => {setIsModalOpen(true)}}>
              <Pen color="#111" strokeWidth={1.5} size={14}/>
              <p className="text-[#111] text-xs font-normal">Edit</p>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-[0.5px] bg-[#D4D4D4] my-1" />
            <DropdownMenu.Item
              className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer"
              onClick={() => mutate(category.id)}
            >
              <TrashIcon color="#E95E5E" strokeWidth={1.5} size={14} />
              <p className="text-[#E95E5E] text-xs font-normal">Delete</p>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </li>

    <ServiecEditCategoryModal 
      open={isModalOpen} 
      onClose={()=>{setIsModalOpen(false)}}  
      title="Edytuj katergorię" 
      categoryId={category.id} 
      categoryName={category.name}
    />
    </>
  );
}
