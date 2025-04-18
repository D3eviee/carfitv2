'use server'
import prisma from "@/lib/db"
import { serviceAuth } from "@/lib/session";
import { format, getDate, getMonth, getYear, isEqual, isSameDay, set, subDays } from "date-fns";

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
        services: true,
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
      services: true,
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

export const getAppointmentsTableData = async (businessId: string) => {
  const data = await prisma.reservation.findMany({
    where: {
      businessId: businessId
    },
    select: {
      client: {

        select: {
          name: true,

          email: true, 
        }
      },
      charge: true,
      reservationStart: true,
      status: true
    }
  })

  return data
}

//FUNCTION FOR ADDING SERVICE CATEGORY
export const addNewCategory = async (categoryName:string) => {
  try {
      const businessId = await serviceAuth();

      // WHETHER CATEGORY ALREADY EXISTS
      const isExisting = await prisma.categories.findFirst({
          where: { serviceId: businessId.id, name: categoryName}
      });

      if (isExisting) {
       return { success: false, message: "Kategoria juz istnieje" }
      }

      await prisma.categories.create({
        data: { serviceId: businessId.id, name: categoryName }
      })

      return { success: true, message: null};
  } catch (error: any) {
      return { success: false, message: "Błąd serwera!"};
  }
};

//FUNCTION FOR EDITING SERVICE CATEGORY
export const editCategory = async (categoryId:string, categoryName: string) => {
  try {
      const businessId = await serviceAuth()

      await prisma.categories.update({
          where: {id: categoryId, service: businessId.id},
          data: {name: categoryName}
      })

      return {success:true}
  } catch (error: any) {
      return { success: false, message: error.message };
  }
};


//FUNCTION FOR DELETING SERVICE CATEGORY
export const deleteCategory = async (categoryId:string) => {
  try {
      await prisma.categories.delete({
          where: {id: categoryId}
      })

      return {success:true}
  } catch (error: any) {
      return { success: false, message: error.message };
  }
};

//FUNCTION FOR GETTING CATEGORY AND SERVICE DATA FOR SERVICES PAGE
export const getServicesForBusiness = async () => {
  try {
      const businessId = await serviceAuth()

      const servicesData = await prisma.categories.findMany({
          where: {
              serviceId: businessId.id
          },
          select: {
              id: true,
              name: true,
              services: {
                  select: {
                      id: true,
                      name: true,
                      durationType: true,
                      from: true,
                      to: true,
                      duration: true,
                      price: true,
                      description: true
                  }
              },
          },
          orderBy: {
              createdAt: "asc"
          }
      })

      return servicesData
  } catch (error) {
      console.log("There was a problem with getting categories", error)
  }
}


export type AddNewServiceProps = {
  serviceId: string,
  name: string,
  description: string,
  price: string,
  durationType: string,
  duration: number,
  category: string,
  from: number,
  to: number,
}

//FUNCTION FOR ADDING SERVICE
export const addNewService = async (serviceData: serviceModalProps) => {
  try {
      const businessId = await serviceAuth()

      const newsSrvice = await prisma.service.create({
          data: {
              serviceId: businessId.id,
              categoryId: serviceData.category,
              name: serviceData.name,
              price: serviceData.price,
              description: serviceData.description,
              durationType: serviceData.durationType,
              duration: serviceData.duration,
              from: serviceData.from,
              to: serviceData.to
          },
      });

      return {success:true}
  } catch (error) {
      console.log(error)
  }
}

export const deleteService = async (id:string) => {
  try {
      await prisma.service.delete({
          where: {
              id: id
          }
      })

      return {success:true}
  } catch (error: any) {
      return { success: false, message: error.message };
  }
};

export const getTodayReservations = async () => {
  const date = new Date()
  const year = getYear(date) 
  const month = getMonth(date)+1
  const todayDay = getDate(date) 

  try {
    const business = await serviceAuth()

    const reservationsThisMonth = await prisma.reservation.findMany({
      where: {
        businessId: business.id,
        reservationYear: year,
        reservationMonth: month,
      },
      select: {
        charge: true,
        duration: true,
        reservationStart: true,
        status: true,
        services: {
          select: {
            service: {
              select:{
                name: true
              }
            }
          }
        }
      },
    })
    
    const reservationsThisMonthDay = reservationsThisMonth.filter((item) => {
     return getDate(item.reservationStart) == todayDay
    })

    return reservationsThisMonthDay
  } catch (error) {
    console.log(error)
  }
}


export const getLastSevenDaysAppointmentNumbers = async () => {
  const endDate = new Date()
  const startDate = subDays(endDate, 6)

  try {
    const business = await serviceAuth()

    const reservationsLastSevenDays = await prisma.reservation.findMany({
      where: {
        businessId: business.id,
        reservationStart: {
          gte: startDate,
          lte: endDate,
        }
      },
      select: {
        charge: true,
        duration: true,
        reservationStart: true,
        status: true,
        services: {
          select: {
            service: {
              select:{
                name: true
              }
            }
          }
        }
      },
    })
  

    const numbersData = []

    for (let i = 0; i < 7; i++) {
      const currentDate = subDays(endDate, 6 - i)

      const visitsInDay = reservationsLastSevenDays.filter(res =>
        isSameDay(res.reservationStart, currentDate)
      ).length

      numbersData.push({
        day: format(currentDate, 'EEE'), 
        numberOfVisits: Number(visitsInDay)
      })
    }

    return numbersData
  } catch (error) {
    console.log(error)
  }
}

export const getLastSevenDaysServicesNumbers = async () => {
  const endDate = new Date()
  const startDate = subDays(endDate, 6)

  try {
    const business = await serviceAuth()

    const reservationsLastSevenDays = await prisma.reservation.findMany({
      where: {
        businessId: business.id,
        reservationStart: {
          gte: startDate,
          lte: endDate,
        }
      },
      select: {
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      },
    })

    const serviceCount: Record<string, number> = {}

    reservationsLastSevenDays.forEach(res => {
      res.services.forEach(({ service }) => {
        const name = service.name
        serviceCount[name] = (serviceCount[name] || 0) + 1
      })
    })

    const topServices = Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) // Tylko top 8

    return topServices
  } catch (error) {
    console.log(error)
  }
}
