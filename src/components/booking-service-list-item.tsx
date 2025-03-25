'use client'
import { cn, displayVisitTime } from "@/utils";
import { Dot, MinusIcon, PlusIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selectedServices = searchParams.get("services")?.split("&") || [];
  const isSelected = selectedServices.includes(service.id);

  const handleOnClick = () => {
    // adding or removing service from array with selected services
    let updatedServices = isSelected
      ? selectedServices.filter(id => id !== service.id) 
      : [...selectedServices, service.id]

    // creating new link based on selected services
    const newParams = new URLSearchParams();
    updatedServices.length > 0 
      ? newParams.set("services", updatedServices.join("&"))
      : newParams.delete("services"); // Usunięcie jeśli pusto

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
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
