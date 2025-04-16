import { ReactNode } from "react";

export default function ServicesServiceList({ children, categoryName }: { children: ReactNode; categoryName: string }) {
  return (
    <div className="w-full flex flex-col gap-2 ">
        <h4 className="text-[#111] text-base font-medium">{categoryName}</h4>
        <hr className="bg-[#DCDCDC] w-full mb-3"/>
      <div className="flex flex-col gap-2.5">
        {children}
        </div>
    </div>
  );
}