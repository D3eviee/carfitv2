'use server'
import prisma from "@/lib/db"

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
        return reservationForDay
    }catch(err){
        console.log(err)
    }
}

// function for requesting search results 
export const getSearchedBusinesses = async (town:string) =>{
    try {
        const searchedBusinesses = prisma.service.findMany({
            where:{
                town: town
            },
            select:{
                id: true,
                name: true,
                image: true,
                category: true,
                town: true,
                district: true,
                street: true,
                zipcode: true,  
                reviews:{
                    select: {
                        rate: true
                    },
                }
            }
        })
        return searchedBusinesses
    } catch (error) {
        return {error}
    }
}

// function for getting recomeneded services on landing page
export const getRecommendedServices = async () => {
    try {
        const recommended = await prisma.business.findMany({ 
            take: 5,
            select:{
                id: true,
                name: true,
                image: true,
                category: true,
                town: true,
                district: true,
                street: true,
                zipcode: true,  
                reviews:{
                    select: {
                        rate: true
                    },
                }
            }
        })

        if(!recommended) return  {error: "There was a problem with fatching your data!"}
        return recommended
    } catch (error) {
        console.error("Error fetching recommended services:", error);
        return {error: error}
    }
}