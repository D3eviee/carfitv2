'use client'
import { useAppointmentStore } from "@/lib/store";
import { cn, displayVisitTime } from "@/utils";
import { Dot, MinusIcon, PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Service = {
  name: string;
  durationType: string;
  duration: number;
  from: number;
  to: number;
  price: string;
  id: string;
  description: string;
  serviceId: string;
  categoryId: string;
};

export const BookingServiceListItem = ({ service }: { service: Service }) => {
  // ZUSTAND STORE FOR MANAGING SELECTED SERVICES
  const selectedServices = useAppointmentStore((store) => store.selectedServices)
  const toggleSelectedService = useAppointmentStore((store) => store.toggleSelectedService)

  const isSelected = selectedServices.includes(service.id);

  const handleOnClick = () => {
    toggleSelectedService(service)
  };

  return (
    <div className={cn("w-full flex flex-row items-center justify-between border p-5 borderounded-md hover:cursor-pointer rounded-md", !isSelected ? " border-[#D4D4D4]" : " border-[#999]" )}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-base text-gray-900 font-medium">{service.name}</h1>
          <h2 className="text-sm text-gray-600">{service.description}</h2>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-sm text-gray-600">{service.price} PLN</p>
          <Dot size="18" color="#555" />
          <p className="text-sm text-gray-600">
            {displayVisitTime(service.from, service.to, service.durationType, service.duration)}
          </p>
        </div>
      </div>

      {/* ADD/REMOVE SERVICE BUTTON */}
      <div
        className={cn(
          "w-10 h-10 flex justify-center items-center border rounded-md",
          isSelected ? "bg-[#000] text-white hover:bg-[#111]" : "bg-[#F2F2F2] text-[#333] hover:bg-[#E3E3E3]"
        )}
        onClick={()=>handleOnClick()}
      >
        {isSelected ? <MinusIcon size={20} /> : <PlusIcon size={20} />}
      </div>
    </div>
  );
};
