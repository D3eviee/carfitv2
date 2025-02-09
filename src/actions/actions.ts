'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () =>{
    const cookieSession = await cookies();
    const token = cookieSession.delete('ClientToken')
    redirect('/')
}