'use client'
import { X } from "lucide-react"
import { useModalStore } from "@/lib/store"
import { createPortal } from "react-dom"
import { ReactNode, useEffect, useState } from "react"

export default function ModalProvider ({ modalTitle, children }: { modalTitle: string; children: ReactNode }) {
    const isAddCategoryModalOpen = useModalStore((state) => state.isAddCategoryModalOpen);
    const isAddServiceModalOpen = useModalStore((state) => state.isAddServiceModalOpen);
    const closeModals = useModalStore((state) => state.closeModals);

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    // if open, create portal and show modal
    return  isAddServiceModalOpen || isAddCategoryModalOpen ? createPortal(
        <>
            <div className="absolute top-0 bg-black opacity-40 w-full h-full z-20"/>
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] min-w-96 max-w-[550px] bg-slate-50 z-20 rounded-lg">
                <div className="p-4 flex items-center justify-center border-b border-slate-300">
                    <h1 className="font-medium text-sm">{modalTitle}</h1>
                    <X className="ml-auto cursor-pointer" onClick={()=>closeModals()} />
                </div>
                <div className="p-8">
                    {children}
                </div>
                </div>
        </>,
        document.body
    ) : null;
}
