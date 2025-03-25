import { ReactNode } from "react";

export default function DashboardContentContainer({children}: {children: ReactNode}){
    return(
        <div className="relative mt-[134px] ml-[270px]  mr-[220px] pb-8">
            {children}
        </div>
    )
}