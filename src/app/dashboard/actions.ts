'use server'
import prisma from "@/lib/db"

export const getAppointmentsForInterval = async (weekInterval) => {
    return await prisma.reservations.findMany({
      where: {
        reservationStart: {
          gte: weekInterval[0], // Start tygodnia
          lte: weekInterval[weekInterval.length - 1], // Koniec tygodnia
        },
      },
      select: {
        duration : true,
        reservationStart: true,
        charge: true,
        clientId:true,
        servicesIds: true
      }
    });
  };