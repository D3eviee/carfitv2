'use server'
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export const businessAuth = async () => {
    const cookieSession = await cookies();
    const token = cookieSession.get("ServiceToken")?.value

    if(!token) {
        return { success: false, id: null}
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        const { id } = decoded;
        return { success: true, id: id}
    } catch (err) {
        return {success: false,  error: `There was an error with your authorization: ${err}` };
    }
}

export const userAuth = async () => {
    const cookieSession = await cookies();
    const token = cookieSession.get("ClientToken")?.value

    if(!token) {
       return { success: false, id: null}
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        const { id } = decoded;
        return { success: true, id: id}
    } catch (err) {
        return {success: false,  error: `There was an error with your authorization: ${err}` };
    }
}

export const authRole = async () => {
    const user = await userAuth()
    const business = await businessAuth()

    if(user.success){
        return {
            role: "CLIENT",
            id: user.id
        }
    }
    else if(business.success){
        return {
            role: "BUSINESS",
            id: business.id,
        }
    }
    else return {id: null}
} 

export const logout = async () => {
    const cookieSession = await cookies()

    const serviceToken = cookieSession.get("ServiceToken")?.value
    const clientToken = cookieSession.get("ClientToken")?.value

    if(clientToken) cookieSession.delete('ClientToken')   
    if(serviceToken) cookieSession.delete('ServiceToken')
        
    redirect('/')
}