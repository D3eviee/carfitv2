import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import {createSession} from "@/lib/session";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
        }

        //create new user and add to database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        })

        //create sesssion
        const session = await createSession(user)
        if (session.success) {
            return NextResponse.json({ success: true }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: "There was a problem with your registration" }, { status: 500 });
    }
}
