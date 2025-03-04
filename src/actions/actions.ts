'use server'
import prisma from "@/lib/db";
import { createServiceSession, createSession, serviceAuth } from "@/lib/session";
import { OnboardingState } from "@/lib/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
    const cookieSession = await cookies();
    const token = cookieSession.delete('ClientToken')
    redirect('/')
}

export const checkIfEmailExists = async (email: string) => {
    try {
        // Check if user already exists
        const existingUser = await prisma.service.findUnique({
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
    const {email, password, businessName, businessCategory, businessPhone, businessOwner, businessTown, businessZipcode, businessDistrict, businessStreet} = data!

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
            return { success: true , status: 200 };
        }

        return {status: "success", message:"Creted user but no session"}
    } catch {
        return {status: "failed", message:"Creating user failed"}
    }
    
}

export const getServiceData = async(id: string) => {
    try{
        const serviceData = await prisma.service.findFirst({
            where: {
                id: id
            }
        }) 

        return serviceData
    }
    catch(error){
        console.log("Error while trying to retreieve service data:", error)
    }
}

export const getWorkingTimeData = async(id: string) => {
    try{
        const serviceData = await prisma.workingDay.findMany({
            where: {
                serviceId: id
            },
            orderBy: {
                dayOfWeek: "asc"
            }
        })


        return serviceData
    }
    catch(error){
        console.log("Error while trying to retreieve working time data:", error)
    }
}

export const getServiceReviews = async(id: string) => {
    try{
        const serviceReviews = await prisma.review.findMany({
            where: {
                serviceID: id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return serviceReviews
    }
    catch(error){
        console.log("Error while trying to retreieve reviews", error)
    }
}

export const getRecommendedServices = async () => {
    try {
        const recommended = await prisma.service.findMany({ take: 5 });
        return recommended

    } catch (error) {
        console.error("Error fetching recommended services:", error);
        return;
    }
} 


export type AddNewServiceProps = {
    serviceId: string,
    name: string,
    description: string,
    price: string,
    durationType: string,
    duration: string,
    category: string,
    from: string,
    to: string,
}

export const addNewService = async (serviceData:serviceModalProps) => {
    try {

        const serviceId = await serviceAuth()
        const newServiceData = await prisma.singleService.create({
            data: {
                serviceId: serviceId.id,
                name: serviceData.name,
                category: serviceData.category,
                price: serviceData.price,
                description: serviceData.description,
                durationType: serviceData.durationType,
                duration: serviceData.duration,
                from: serviceData.from,
                to: serviceData.to,
            }
        })
        return {newServiceData}
    } catch (error) {
        console.log(error)
    }
}

export const addNewCategory = async (categoryData:serviceCategoryProps) => {
    try {
        const serviceId = await serviceAuth()

        const newServiceData = await prisma.categories.create({
            data: {
                serviceId: serviceId.id,
                name: categoryData.name,
            }
        })
        return {newServiceData}
    } catch (error) {
        console.log(error)
    }
}

export const getCategories = async () => {
    try {
        const serviceId = await serviceAuth()

        const categories = await prisma.categories.findMany({
            where: {
                serviceId: serviceId.id
            },
            select: {
                name: true
            }
        })

        return categories

    } catch (error) {
        console.log("There was a problem with getting categories", error)
    }
}