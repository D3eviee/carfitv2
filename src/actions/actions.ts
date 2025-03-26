'use server'
import prisma from "@/lib/db";
import { categoryName } from "@/lib/schema";
import { createServiceSession, createSession, serviceAuth } from "@/lib/session";
import { OnboardingState } from "@/lib/store";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

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
        const serviceData = await prisma.service.findFirst({
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
                }
            }
        })

        return serviceData
    }
    catch (error) {
        console.log("Error while trying to retreieve service data:", error)
    }
}

export const getWorkingTimeData = async (id: string) => {
    try {
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
    catch (error) {
        console.log("Error while trying to retreieve working time data:", error)
    }
}

export const getServiceReviews = async (id: string) => {
    try {
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
    catch (error) {
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
    duration: number,
    category: string,
    from: number,
    to: number,
}

export const addNewService = async (serviceData: serviceModalProps) => {
    try {
        const serviceId = await serviceAuth()


        const newService = await prisma.singleService.create({
            data: {
                serviceId: serviceId.id,
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
        
        const data = await prisma.categories.findMany({
            where: {
                serviceId: serviceId.id
            },
            select:{
                name: true,
                services:true,
            }
        })

        return data
    } catch (error) {
        console.log(error)
    }
}

export const addNewCategory = async ({ name }: { name: string }) => {
    try {
        const validation = categoryName.safeParse(name);
        if (!validation.success) {
            throw new Error("Category name needs to be plain text");
        }

        const serviceId = await serviceAuth();
        const isExisting = await prisma.categories.findFirst({
            where: { serviceId: serviceId.id, name: name}
        });

        if (isExisting) {
            throw new Error("Category already exists");
        }

        await prisma.categories.create({
            data: { serviceId: serviceId.id, name }
        });

        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const deleteCategory = async (id:string) => {
    try {
        await prisma.categories.delete({
            where: {
                id: id
            }
        })

        return {success:true}
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const deleteService = async (id:string) => {
    try {
        await prisma.singleService.delete({
            where: {
                id: id
            }
        })

        return {success:true}
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};


export const getServicesData = async () => {
    try {
        const serviceId = await serviceAuth()

        const servicesData = await prisma.categories.findMany({
            where: {
                serviceId: serviceId.id
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
  
        const serviceData = await prisma.service.findUnique({
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
    const allServices = await prisma.singleService.findMany({
        where: {
            serviceId: id
        },
    })
    return allServices
}