'use client'
import { usePathname, useRouter } from "next/navigation";

export const BookingButton = () => {
    const path = usePathname();
    const router = useRouter();

    const handleRedirect = () => {
      router.replace(`${path}/booking`);
    };
    
    return (
    <div className="w-full bg-[#000000] text-white text-[18px] font-medium text-center leading-[20px] py-[10px] rounded-[7px] hover:cursor-pointer" onClick={handleRedirect}>
      Zarezerwuj wizytę
    </div>
  );
};
