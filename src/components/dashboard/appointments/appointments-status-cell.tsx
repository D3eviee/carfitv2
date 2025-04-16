import { cn } from "@/utils";

export  default function AppointmentStatusCell({getValue}){
    const status = getValue();

    return (
        <div className="w-full">
            <p className={cn("text-sm, font-medium w-fit px-2 py-0.5 rounded-md", status == "Anulowana" ? "bg-red-500 text-white" : "bg-orange-400 text-white")}>{status}</p>
        </div>
    )
}