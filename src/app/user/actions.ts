'use server'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import prisma from "@/lib/db";

export const userAuth = async () => {
    const cookieSession = await cookies();
    const token = cookieSession.get("ClientToken")?.value

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        const { id } = decoded;
        return { id };
    } catch (err: any) {
        return { error: "Unauthorized " + err.message };
    }
}

export const getClientAppointments = async () => {
    const userData = await userAuth()

    return await prisma.reservation.findMany({
        where: {
            clientId: userData.id
        },
        include: {
            services: {
                select: {
                    serviceId: true
                }
            }
        }
    })
}

//GETTING BUSINESS DATA FOR USER APPOINTMENT
export const getAppointmentBusinessData = async (id: string) => {
    try {
        const businessData = await prisma.business.findFirst({
            where: {
                id: id
            },
            select: {
                name: true,
                phone: true,
                image: true,
                town: true,
                district: true,
                zipcode: true,
                street: true,
            }
        })

        return businessData
    }
    catch (error) {
        console.log("Error while trying to retreieve service data:", error)
    }
}


//function for getting user profile information 
export const getUserProfileData = async () => {
    const userId = await userAuth()

    try {
        const userData = await prisma.client.findUnique({
            where: {
                id: userId.id
            },
            select: {
                id: true,
                email: true,
                image: true,
                name: true,
                phone: true,
            }
        })

        return userData
    } catch (error) {
        return error
    }
}

export const updateUserData = async (data) => {
    const userId = await userAuth()

    try {
        const userData = await prisma.client.update({
            where: {
                id: userId.id
            },
            data: {
                name: data.name,
                phone: data.phone,
            }
        })

        return userData
    } catch (error) {
        return error
    }
}
