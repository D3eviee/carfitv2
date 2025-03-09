"use client";
import DashboardContentContainer from "@/components/dashboard/dashboard-content-container";
import { MoreVertical, Pen, TrashIcon } from "lucide-react";
import { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AddCategoryButton } from "@/components/dashboard/services/add-category-button";
import { AddServiceButton } from "@/components/dashboard/services/add-service-button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, deleteService, getServicesData } from "@/actions/actions";

export default function ServicePage() {
  const { data, error } = useQuery({
    queryKey: ["category"],
    queryFn: getServicesData,
  });

  return (
    <DashboardContentContainer>
      <div className="flex flex-col gap-5">
        {/*heading*/}
        <div className="flex flex-col gap-4  py-5">
          <h1 className="text-3xl leading-4 text-[#111111] font-medium">
            Services
          </h1>
          <h2 className="text-sm text-[#555555] font-light">
            Add and edit services that your business offers to clients
          </h2>
        </div>

        {/*content*/}
        <div className="flex flex-row gap-[20px]">
          {/*left sidebar menu*/}
          <CategoriesSidebar categories={data} />

          {/*right content*/}
          <div className="bg-[#FFFFFF] w-[647px] flex flex-col gap-5 px-4 py-10 border-[0.5px] border-[#D4D4D4] rounded-lg ">
            {/*div for aligning button to right*/}
            <div className="w-full flex flex-row justify-end">
              <AddServiceButton />
            </div>

            {/*div for service items*/}
            <div className="mt-5 min-h-40 px-9 flex flex-col items-center justify-center gap-12">
              {data && data?.length > 0 ? (
                data.map((category) => {
                  return (
                    <CategorySection
                      key={category.id}
                      categoryName={category.name}
                    >
                      {category.services && category.services.length > 0 ? (
                        category.services.map((service) => {
                          return (
                            <CategorySectionItem
                              key={service.id}
                              service={service}
                            />
                          );
                        })
                      ) : (
                        <p className="text-sm font-light text-[#555] text-center">
                          No items
                        </p>
                      )}
                    </CategorySection>
                  );
                })
              ) : (
                <p className="text-sm font-light text-[#555] text-center">
                  No items
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardContentContainer>
  );
}

function CategoriesSidebar({ categories }) {
  const queryClient = useQueryClient()

   const { mutate } = useMutation({
          mutationFn: async (id: string) => await deleteCategory(id),
          onSuccess: (data) => {
              if (data?.success) {
                  queryClient.invalidateQueries({ queryKey: ["category"] });
              }
              console.log(data)
          },
      });

  return (
    <div className="bg-[#FFFFFF] w-[215px] max-h-fit flex flex-col gap-5  px-4 py-5 border-[0.5px] border-[#D4D4D4] rounded-lg ">
      <h3 className="text-base text-[#333] font-semibold  px-2.5">
        Categories
      </h3>
      <ul className="flex flex-col gap-2 min-h-7 list-none">
        {categories && categories?.length > 0 ? (
          categories.map((category, index) => {
            return (
              <div className="flex flex-row w-full px-2.5 py-2.5 rounded-[5px] border-[0.5px] border-[#D4D4D4] items-center justify-between" key={index}>
                <li
                  key={index}
                  className="leading-3 text-sm text-[#111] font-base "
                >
                  {category.name}
                </li>
                
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
                      <DropdownMenu.Item className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer">
                        <Pen color="#111" strokeWidth={1.5} size={14} />
                        <p className="text-[#111] text-xs font-normal">Edit</p>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-[0.5px] bg-[#D4D4D4] my-1" />
                      <DropdownMenu.Item className="p-2 flex flex-row justify-start items-center gap-2 outline-none hover:bg-slate-50 hover:cursor-pointer" 
                        onClick={()=> mutate(category.id)}
                      >
                        <TrashIcon
                          color="#E95E5E"
                          strokeWidth={1.5}
                          size={14} 
                        />
                        <p className="text-[#E95E5E] text-xs font-normal">Delete</p>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            );
          })
        ) : (
          <li className="text-sm font-light text-[#555] text-center">
            No categories
          </li>
        )}
      </ul>
      <AddCategoryButton />
    </div>
  );
}

function CategorySection({
  children,
  categoryName,
}: {
  children: ReactNode;
  categoryName: string;
}) {
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="flex flex-col gap-0.5 border-b border-b-[#DCDCDC] pb-3">
        <h4 className="text-[#111] text-base font-medium">{categoryName}</h4>
        <p className="text-[#333] text-xs font-light">
          Some small description for category.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

type Service = {
  name: string;
  id: string;
  description: string;
  price: string;
  durationType: string;
  from: string;
  to: string;
  duration: string;
};

function CategorySectionItem({ service }: { service: Service }) {
  const timeFrame = (timeType: string) => {
    let time: string;
    switch (timeType) {
      case "precise":
        time = service.duration;
        break;
      case "range":
        time = `${service.from} - ${service.to}`;
        break;
      default:
        time = "Czas trawani wizyty może być zmienny";
        break;
    }
    return time;
  };

  const queryClient = useQueryClient()

   const { mutate } = useMutation({
          mutationFn: async (id: string) => await deleteService(id),
          onSuccess: (data) => {
              if (data?.success) {
                  queryClient.invalidateQueries({ queryKey: ["category"] });
              }
              console.log(data)
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
          <h2 className="text-[#333] text-sm font-normal">
            {timeFrame(service.durationType)}
          </h2>
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
