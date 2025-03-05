import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function DashboardContentContainer({children}: {children: ReactNode}){
    return(
        <div className="relative mt-[134px] ml-[270px] pb-8">
            {children}
        </div>
    )
}