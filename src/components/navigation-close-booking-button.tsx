'use client'
import { useCalendarStore } from "@/lib/store";
import { X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation"

export const NavigationCloseBookingButton = () => {
    const path = useParams()
    const setSelectedDate = useCalendarStore((store) => store.setSelectedDate)

    return (
       <Link href={`/service/${path.business}`} onClick={() => setSelectedDate(new Date())}>
        <X strokeWidth={2.5} className="text-[#333] hover:text-[#111] cursor-pointer" />
       </Link> 
    )
}