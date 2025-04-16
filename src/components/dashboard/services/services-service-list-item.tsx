import { deleteService } from "@/app/dashboard/actions";
import { displayVisitTime } from "@/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Pen, TrashIcon } from "lucide-react";

type Service = {
  name: string;
  id: string;
  description: string;
  price: string;
  durationType: string;
  from: number;
  to: number;
  duration: number;
};

export default function ServicesServiceListItem({ service }: { service: Service }) {
  const queryClient = useQueryClient()

   const { mutate } = useMutation({
          mutationFn: async (id: string) => await deleteService(id),
          onSuccess: (data) => {
              if (data?.success) {
                  queryClient.invalidateQueries({ queryKey: ["category"] });
              }
          },
      });

  return (
    <div className="w-full flex flex-row bg-[#F9FAFC] border-[0.5px] border-[#D4D4D4] rounded-[10px] overflow-hidden py-3">
      <div className="w-[6px] bg-purple-600 h-full opacity-45" />
      {/* content */}
      <div className="w-full px-3 py-2 pr-2 flex flex-row justify-between">
        {/* right headings */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[#111] text-base font-medium">{service.name}</h1>
          <h2 className="text-[#333] text-sm font-normal">{displayVisitTime(service.from, service.to, service.durationType , service.duration)}</h2>
        </div>
        {/* left details */}
        <div className="flex flex-row gap-3">
          <p className="h-full flex flex-col justify-end text-[#111] text-sm font-normal">
            {service.price} PLN
          </p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <MoreVertical
                size={20}
                color="#111"
                className="hover:cursor-pointer"
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-[#FFFFFF] flex flex-col p-1 gap-0.3 border-[0.5px] border-gray-200 shadow-[0px_0px_0px_1px_#D4D4D480] rounded"
                align="end"
                sideOffset={3}
              >
                <DropdownMenu.Item className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer">
                  <Pen color="#111" strokeWidth={1.5} size={14} />
                  <p className="text-[#111] text-xs font-normal">Edit</p>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-[0.5px] bg-[#D4D4D4] my-1" />
                <DropdownMenu.Item className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer" onClick={()=> mutate(service.id)}>
                  <TrashIcon color="#E95E5E" strokeWidth={1.5} size={14} />
                  <p className="text-[#E95E5E] text-xs font-normal">Delete</p>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}