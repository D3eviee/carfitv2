'use client';
import { getCategoriesDataForService } from "@/actions/actions";
import { ServicePageService } from "@/components/service-page-service";
import { cn, getServiceIdFromParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ServicePageList() {
  const [activeCategoryServices, setActiveCategoryServices] = useState<string>("");

  // extracting ID
  const id = getServiceIdFromParams()

  //getting service data
  const { data} = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      return getCategoriesDataForService(id);      
    },
  });

  // marking category after loading
  useEffect(() => {
    if (data && data.length > 0) {
      setActiveCategoryServices(data[0].id);
    }
  }, [data]);
  
  return (
    <div className="w-full flex flex-row gap-[10px] p-[5px] mb-[15px]">
      <div className="w-full flex flex-col gap-8">
          {/*SERVICES*/}
          <div className="flex flex-col gap-2">
            <h1 className="text-[30px] text-[#000000] font-medium">Usługi</h1>
            <div className="flex flex-row gap-[13px] overflow-scroll rounded-[5px] pr-[5px] mb-[15px]">
              {data && data.length > 0 ? (
                data.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className={cn(
                        "flex-none text-[#22262F] text-[15px] font-medium rounded-[7px] px-[10px] py-[5px] border-[0.5px] border-[] bg-[#F2F4F8] hover:cursor-pointer",
                        activeCategoryServices == category.id ? "bg-[#111] text-[#F2F4F8]" : ""
                      )}
                      onClick={() => {setActiveCategoryServices(category.id);}}
                    >
                      {category.name}
                    </div>
                  );
                })
              ) : (
                <p className="text-black">This business offers no services</p>
              )}
            </div>
            {data?.map((category) =>
              category.services
                .filter(
                  (service) => service.categoryId == activeCategoryServices
                )
                .map((filteredService) => (
                  <ServicePageService key={filteredService.id} service={filteredService} />
                ))
            )}
          </div>
        </div>
      </div>
  );
}
