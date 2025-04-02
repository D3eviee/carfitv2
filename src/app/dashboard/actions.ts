'use server'
import prisma from "@/lib/db"
import { set } from "date-fns";

export const getAppointmentsForWeekInterval = async (weekInterval) => {
    return await prisma.reservation.findMany({
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
        servicesIds: true,
        clientId:true,
        client:{
          select: {
            name:true,
            email: true
          }
        }
      },
    });
};

export const getAppointmentsForMonthInterval = async (monthInterval) => {
  return await prisma.reservation.findMany({
    where: {
      reservationStart: {
        gte: monthInterval[0], // month start
        lte: monthInterval[monthInterval.length - 1], // month end
      },
    },    
    select: {
      duration : true,
      reservationStart: true,
      charge: true,
      clientId:true,
      servicesIds: true,
      client:{
        select: {
          name:true,
          email: true
        }
      }
    }
  });
};

export const getAppointmentsForCurrentDay = async (nowDate:Date) => {
  const start = set(nowDate, {hours:6, minutes:0})
  const finish = set(nowDate, {hours:20, minutes:0})

  return await prisma.reservation.findFirst({
    where: {
      reservationStart: {
        gte: start,
        lte: finish
      }
    },
    select: {
      reservationStart:true,
      reservationEnd: true,
      charge: true,
      client: {
        select: {
          email: true,
          image: true,
          name: true,
        }
      }
    }
  })

}