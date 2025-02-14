import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import {createSession} from "@/lib/session";
import { error } from "console";

export async function POST(req: NextRequest) {
    try {
        const {email, password } = await req.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if(!existingUser){
            return NextResponse.json({ error: "User doesn't exist" }, {status: 409});
        }else{
            const isPasswordValid = await bcrypt.compare(password, existingUser.password as string)
            if(isPasswordValid){
                await createSession(existingUser)
                return NextResponse.json({ message: true }, { status: 201 });
            }
            else{
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }
        }
    } catch (error) {
        return NextResponse.json({ error: "There was a problem with your registration" }, { status: 500 });
    }
}
