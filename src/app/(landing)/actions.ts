'use server'
import prisma from "@/lib/db"
import { subHours } from "date-fns"

export const getActiveMonthAppointments = async(activeDate:Date, businessId:string) => {
    const activeDateYear = activeDate.getFullYear()
    const activeDateMonth = activeDate.getMonth()+1

    try{
        const reservationForDay = await prisma.reservation.findMany({
            where: {
                businessId: businessId,
                reservationYear:activeDateYear,
                reservationMonth: activeDateMonth,
            },
           select: {
            reservationStart: true,
            reservationEnd: true,
            duration: true
           },
        })

        const daysToUTC = reservationForDay.map((item) => {
            return {
                duration: item.duration,
                reservationStart : subHours(item.reservationStart, 2),
                reservationEnd: subHours(item.reservationEnd, 2)
            }
        })

        return reservationForDay
    }catch(err){
        console.log(err)
    }
}