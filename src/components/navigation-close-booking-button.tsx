'use client'
import { X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation"

export const NavigationCloseBookingButton = () => {
    const path = useParams()

    return (
       <Link href={`/service/${path.business}`}>
        <X strokeWidth={2.5} className="text-[#333] hover:text-[#111] cursor-pointer" />
       </Link> 
    )
}