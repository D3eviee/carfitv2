'use client'
import { displayVisitTime } from "@/utils";
import { Dot, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ServiceData = {
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

export const BookingSummaryItem = ({serviceData, activeStep}:{serviceData: ServiceData, activeStep:number}) => {
  const handleRemovingItem = () => {
    return
  };

  return (
    <div className="flex flex-row justify-between items-center w-full bg-[#F6F6F6] p-2.5 rounded-md">
        <div className="flex flex-col gap-1.5">
            <h1 className="text-sm text-[#111] font-normal">{serviceData.name}</h1>
            <div className="flex flex-row items-center">
                <p className="text-sm text-[#333] font-normal">{serviceData.price} PLN</p>
                <Dot size="18" color="#333" />
                <p className="text-sm text-[#333]">{displayVisitTime(serviceData.from, serviceData.to, serviceData.durationType, serviceData.duration)}</p>
            </div>
        </div>
        {activeStep != 3 && <X size={20} onClick={handleRemovingItem} className="text-[#333] hover:cursor-pointer hover:text-[#111111] "/>
        }
    </div>
  );
};
