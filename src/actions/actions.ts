'use server'
import { createServiceSession, serviceAuth } from "@/lib/session";
import { OnboardingState } from "@/lib/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export const logout = async () => {
    const cookieSession = await cookies();
    const token = cookieSession.delete('ClientToken')
    redirect('/')
}

export const checkIfEmailExists = async (email: string) => {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { isEmailAvalable: false, message: "Account with this email already exists" }
        }

        return { isEmailAvalable: true, message: "Email available" }
    } catch (error) {
        return { isEmailAvalable: false, message: "Error while processing email!" }
    }
}

export const createService = async (data: OnboardingState, workingDays: WorkingDay[]) => {
    const { email, password, businessName, businessCategory, businessPhone, businessOwner, businessTown, businessZipcode, businessDistrict, businessStreet } = data!

    try {
        //create new service and add to database
        const service = await prisma.service.create({
            data: {
                email: email!,
                password: password!,
                name: businessName!,
                category: businessCategory!,
                phone: businessPhone!,
                owner: businessOwner!,
                town: businessTown!,
                zipcode: businessZipcode!,
                district: businessDistrict!,
                street: businessStreet!,
            }
        })

        //create new service and add to database
        if (service) {
            const days = await Promise.all(
                workingDays.map((day: WorkingDay) =>
                    prisma.workingDay.create({
                        data: {
                            dayOfWeek: day.day,
                            open: day.open,
                            close: day.close,
                            isOpen: day.isOpen,
                            serviceId: service.id
                        }
                    })
                ))
        }

        //create sesssion
        const session = await createServiceSession(service)
        if (session.success) {
            return { success: true, status: 200 };
        }

        return { status: "success", message: "Creted user but no session" }
    } catch {
        return { status: "failed", message: "Creating user failed" }
    }
}

export const getServiceData = async (id: string) => {
    try {
        const serviceData = await prisma.business.findFirst({
            where: {
                id: id
            },
            include :{
                categories: {
                    select: {
                        id: true,
                        name: true,
                        services: true
                    }
                },
                images :{
                    select: {
                        id: true,
                        photoUrl: true
                    }
                }
            }
        })

        return serviceData
    }
    catch (error) {
        console.log("Error while trying to retreieve service data:", error)
    }
}

export const getWorkingTimeData = async (businessId: string) => {
    try {
        const businessData = await serviceAuth()

        const serviceData = await prisma.workingDay.findMany({
            where: {
                serviceId: businessData.id || businessId
            },
            orderBy: {
                dayOfWeek: "asc"
            }
        })

        return serviceData
    }
    catch (error) {
        console.log("Error while trying to retreieve working time data:", error)
    }
}

export const getServiceReviews = async (id: string) => {
    try {
        const serviceReviews = await prisma.review.findMany({
            where: {
                serviceId: id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return serviceReviews
    }
    catch (error) {
        console.log("Error while trying to retreieve reviews", error)
    }
}

export const getCategoriesDataForService = async (id:string) => {
    const categoriesData = await prisma.categories.findMany({
        where: {
            serviceId: id
        },
        select: {
            id: true,
            name: true,
            services: true
        }
    })
    return categoriesData
}

export const signInService = async (data: { email: string; password: string }) => {
    try{
        const { email, password } = data;
  
        const serviceData = await prisma.business.findUnique({
          where: { email }
        });
      
        if (!serviceData) {
          return { success: false, error: "Account with this email doesn't exist" };
        }
      
        const isPasswordValid = await bcrypt.compare(password, serviceData.password);
      
        if (!isPasswordValid) {
          return { success: false, error: "Invalid password" };
        }

        const session = await createServiceSession(serviceData)
        if (session.success) {
            return {success: true, message: "User loged in"}
        }
    }catch(error){
        return {success: false, error: `Unexpected error occured:  ${error}`}
    }


};

export const getAllServicesForBusiness = async (id:string) => {

    const categories = await prisma.categories.findMany({
        where: {
            serviceId: id
        },
        select: {
            id: true,
            name: true,
            services: true
        }
    })

    const services = await prisma.service.findMany({
        where: {
            serviceId: id
        },
    })
    return {categories, services}
}


export const getServiceDataForBooking = async (id:string) => {
    const allServices = await prisma.service.findMany({
        where: {
            serviceId: id
        },
    })
    return allServices
}

type AddNewReservationProps =  {
    businessId?: string
    clientId: string
    servicesIds: string[]
    reservationStart: Date 
    reservationYear: number
    reservationMonth: number
    reservationEnd: Date
    duration: number
    charge: number
    status: string
    clientName: string
    clientPhone: string
}

export const addNewReservation = async (reservation:AddNewReservationProps) => {
    try{
        const businessData = await serviceAuth()

        const newReservation = await prisma.reservation.create({
            data: {
              businessId: reservation.businessId ?? businessData.id,
              clientId: reservation.clientId,
              reservationYear: reservation.reservationYear,
              reservationMonth: reservation.reservationMonth + 1,
              reservationStart: reservation.reservationStart,
              reservationEnd:reservation.reservationEnd,
              duration: reservation.duration,
              charge: reservation.charge,
              status: reservation.status,
              clientName: reservation.clientName,
              clientPhone: reservation.clientPhone,
              
            }
          });
          
          await Promise.all(
            reservation.servicesIds.map((serviceId) =>
              prisma.reservationServices.create({
                data: {
                  reservationId: newReservation.id,
                  serviceId: serviceId
                }
              })
            )
          );

        return newReservation
    }catch(err){
        console.log(err)
    }
}

export const putProfileImageToDatabase = async (userId:string, imageKey:string) => {
    const s3Link = `https://carfitapp.s3.eu-north-1.amazonaws.com/${imageKey}`

    const putImage  = await prisma.client.update({
        where: {
            id: userId
        },
        data: {
            image: s3Link
        }
    })
    
    return putImage
}

export const putBusinessImageToGallery = async (serviceId:string, imageKey:string) => {
    const s3Link = `https://carfitapp.s3.eu-north-1.amazonaws.com/${imageKey}`

    const putImage  = await prisma.image.create({
        data: {
            businessId: serviceId,
            photoUrl: s3Link
        }
    })
    
    return putImage
}
