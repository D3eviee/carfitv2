'use server'
import prisma from "@/lib/db";
import { BusinessOnboardingSchema } from "@/lib/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () =>{
    const cookieSession = await cookies();
    const token = cookieSession.delete('ClientToken')
    redirect('/')
}

export const createBusinessAccount = async (businessData: BusinessOnboardingSchema, businessWorkingDays: WorkingDay[]) => {

    if (!businessData.email || !businessData.password || !businessData.businessName) {
        console.error("Błąd: Brak wymaganych danych");
        return;
      }

    const createdService = await prisma.service.create({
        data: {
            email: businessData.email,
            password: businessData.password,
            name: businessData.businessName,
            phone: businessData.businessPhone,
            owner: businessData.businessOwner,
            town: businessData.businessTown,
            zipcode: businessData.businessZipcode,
            district: businessData.businessDistrict,
            street: businessData.businessStreet,
        }
    })

    await Promise.all(
        businessWorkingDays.map((day) =>
            prisma.workingDay.create({
                data: {
                    dayOfWeek: day.day,
                    open: day.open,
                    close: day.close,
                    isOpen: day.isOpen,
                    serviceId: createdService.id
                }
            })
        )
    );
}