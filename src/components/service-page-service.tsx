import { displayVisitTime } from "@/utils";
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
}

export const ServicePageService = ({service}:{service:Service}) => {
  return (
    <div className="min-w-full flex flex-row items-center justify-between gap-[116px] p-[20px] bg-[#F2F4F8] border-[0.5px] border-[#D4D4D4] rounded-[5px] hover:bg-[#E5E5E5] hover:cursor-pointer">
      <div className="flex flex-col">
        <h3 className="text-[15px] text-[#333333] font-medium">{service.name}</h3>
        <p className="text-[13px] text-[#555555] font-normal">{displayVisitTime(service.from, service.to, service.durationType ,service.duration)}</p>
      </div>
      <div className="flex flex-row gap-[70px] items-center">
        <p className="text-[15px] text-[#000000] font-medium leading-[18px]">od {service.price} PLN</p>
        <div className="bg-[#F25287] border-[0.5px] border-[#CCCCCC] rounded-[7px] px-[12px] py-2 text-white">Umów</div>
      </div>
    </div>
  );
};
