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

export const getAllClientAppointments = async (id:string) => {
    const appointments = await prisma.reservations.findMany({
        where: {
            clientId: id
        }
    })
    return appointments
}

export const getServiceName = async (serviceId: string) => {

    const serviceName = await prisma.service.findUnique({
        where: {
            id: serviceId
        },
        select: {
           name: true,
           district: true,
           town: true,
           zipcode: true,
           street: true
        }
    });

    return serviceName
};
